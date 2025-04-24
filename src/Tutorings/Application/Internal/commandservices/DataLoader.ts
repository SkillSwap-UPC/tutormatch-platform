import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { DataInitializer } from './DataInitializer';
import { SemesterRepository } from '../../../Infrastructure/persistence/jpa/repositories/SemesterRepository';

/**
 * Component responsible for loading data into the database upon application startup
 * if no semesters are found in the repository.
 * 
 * En NestJS, utilizamos OnModuleInit en lugar de CommandLineRunner de Spring Boot
 */
@Injectable()
export class DataLoader implements OnModuleInit {
  private readonly logger = new Logger(DataLoader.name);

  constructor(
    private readonly semesterRepository: SemesterRepository,
    private readonly dataInitializer: DataInitializer
  ) {}

  /**
   * Este método se ejecuta automáticamente cuando el módulo se inicializa
   * Es el equivalente al CommandLineRunner en Spring Boot
   */
  async onModuleInit() {
    try {
      this.logger.log('Checking if initial data needs to be loaded...');
      
      // Verificar si hay semestres en la base de datos usando el repositorio 
      const count = await this.semesterRepository.count();
      
      // Si no hay semestres, cargar los datos iniciales
      if (count === 0) {
        this.logger.log('No existing semesters found. Loading initial data...');
        await this.dataInitializer.loadInitialData();
        this.logger.log('Initial data loaded successfully.');
      } else {
        this.logger.log(`Found ${count} existing semester(s), skipping data initialization.`);
      }
    } catch (error) {
      this.logger.error(`Error during data initialization: ${error.message}`, error.stack);
      // No lanzamos el error para permitir que la aplicación continúe iniciando
      
      // Intento alternativo de inicialización si el conteo falla
      try {
        this.logger.log('Attempting to load initial data anyway...');
        await this.dataInitializer.loadInitialData();
        this.logger.log('Initial data loaded successfully after error recovery.');
      } catch (innerError) {
        this.logger.error(`Failed to load initial data: ${innerError.message}`, innerError.stack);
      }
    }
  }
}