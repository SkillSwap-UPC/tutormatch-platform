import { Injectable, Logger } from '@nestjs/common';
import { Semester } from 'src/Tutorings/Domain/Model/Entities/Semester.entity';
import { Course } from 'src/Tutorings/Domain/Model/Entities/Course.entity';
import { SemesterService } from './SemesterService';
import { SemesterRepository } from '../../../Infrastructure/persistence/jpa/repositories/SemesterRepository';

/**
 * Service responsible for loading initial data into the database,
 * including semesters and associated courses.
 */
@Injectable()
export class DataInitializer {
  private readonly logger = new Logger(DataInitializer.name);

  constructor(
    private readonly semesterRepository: SemesterRepository,
    private readonly semesterService: SemesterService
  ) {}

  /**
   * Loads the initial data into the database, ensuring that all semesters and
   * their associated courses are saved.
   * This method ensures atomicity through the repository.
   */
  async loadInitialData(): Promise<void> {
    try {
      this.logger.log('Creating initial semesters and courses...');
      const semesters = this.createSemesters();
      
      // Guardar todos los semestres usando el repositorio
      for (const semester of semesters) {
        await this.semesterRepository.save(semester);
        this.logger.log(`Saved semester: ${semester.name} with ${semester.courses.length} courses`);
      }

      // Asignar cursos a cada semestre
      for (const semester of semesters) {
        await this.semesterService.assignCoursesToSemester(semester);
        this.logger.log(`Assigned courses to semester: ${semester.name}`);
      }

      this.logger.log('Initial data loaded successfully');
    } catch (error) {
      this.logger.error(`Failed to load initial data: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Creates a list of semesters along with their respective courses.
   *
   * @return a list of predefined Semester entities,
   * each containing a list of associated Course entities
   */
  private createSemesters(): Semester[] {
    const semesters: Semester[] = [];

    // Primer semestre
    const firstSemester = new Semester("First");
    const introAlgorithms = new Course(
      "Introducción a los Algoritmos", 
      "Fundamentos de algoritmos y su aplicación.", 
      1,
      firstSemester
    );
    firstSemester.courses = [introAlgorithms];
    semesters.push(firstSemester);

    // Segundo semestre
    const secondSemester = new Semester("Second");
    const algorithms = new Course(
      "Algoritmos", 
      "Estudio de algoritmos avanzados y su análisis.",
      2, 
      secondSemester
    );
    secondSemester.courses = [algorithms];
    semesters.push(secondSemester);

    // Tercer semestre
    const thirdSemester = new Semester("Third");
    const dataStructures = new Course(
      "Algoritmos y Estructuras de Datos", 
      "Estructuras de datos y su uso en algoritmos.", 
      3, 
      thirdSemester
    );
    const designPatterns = new Course(
      "Diseño y Patrones de Software", 
      "Principios de diseño y patrones de software.", 
      3, 
      thirdSemester
    );
    thirdSemester.courses = [dataStructures, designPatterns];
    semesters.push(thirdSemester);

    // Cuarto semestre
    const fourthSemester = new Semester("Fourth");
    const dbDesign = new Course(
      "Diseño de Base de Datos", 
      "Modelado y diseño de bases de datos.", 
      4, 
      fourthSemester
    );
    const mobileHCI = new Course(
      "IHC y Tecnologías Móviles", 
      "Interacción Humano-Computadora y desarrollo móvil.", 
      4, 
      fourthSemester
    );
    fourthSemester.courses = [dbDesign, mobileHCI];
    semesters.push(fourthSemester);

    // Quinto semestre
    const fifthSemester = new Semester("Fifth");
    const webApps = new Course(
      "Aplicaciones Web", 
      "Desarrollo de aplicaciones para la web.", 
      5, 
      fifthSemester
    );
    const openSource = new Course(
      "Desarrollo de Aplicaciones Open Source", 
      "Principios y prácticas del desarrollo Open Source.", 
      5, 
      fifthSemester
    );
    fifthSemester.courses = [webApps, openSource];
    semesters.push(fifthSemester);

    // Sexto semestre
    const sixthSemester = new Semester("Sixth");
    const mobileApps = new Course(
      "Aplicaciones para Dispositivos Móviles", 
      "Desarrollo de aplicaciones para móviles.", 
      6, 
      sixthSemester
    );
    const algoComplexity = new Course(
      "Complejidad Algorítmica", 
      "Estudio de la complejidad de algoritmos.", 
      6, 
      sixthSemester
    );
    sixthSemester.courses = [mobileApps, algoComplexity];
    semesters.push(sixthSemester);

    // Séptimo semestre
    const seventhSemester = new Semester("Seventh");
    const swExperiments = new Course(
      "Diseño de Experimentos de Ingeniería de Software", 
      "Diseño de experimentos en el contexto del software.", 
      7, 
      seventhSemester
    );
    const swArchitecture = new Course(
      "Fundamentos de Arquitectura de Software", 
      "Principios de arquitectura de software.", 
      7, 
      seventhSemester
    );
    seventhSemester.courses = [swExperiments, swArchitecture];
    semesters.push(seventhSemester);

    // Octavo semestre
    const eighthSemester = new Semester("Eighth");
    const emergingArchitectures = new Course(
      "Arquitecturas de Software Emergentes", 
      "Nuevas tendencias en arquitecturas de software.", 
      8, 
      eighthSemester
    );
    const projectManagement = new Course(
      "Gerencia de Proyectos en Computación", 
      "Gestión de proyectos en el ámbito de la computación.", 
      8, 
      eighthSemester
    );
    eighthSemester.courses = [emergingArchitectures, projectManagement];
    semesters.push(eighthSemester);

    return semesters;
  }
}