import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Semester } from 'src/Tutorings/Domain/Model/Entities/Semester.entity';

/**
 * Repository interface for managing {@link Semester} entities.
 */
@Injectable()
export class SemesterRepository {
  constructor(
    @InjectRepository(Semester)
    private readonly repository: Repository<Semester>
  ) {}

  // Métodos básicos del repositorio
  async save(semester: Semester): Promise<Semester> {
    return this.repository.save(semester);
  }

  async findById(id: number): Promise<Semester | null> {
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  async findAll(): Promise<Semester[]> {
    return this.repository.find({
      relations: ['courses']
    });
  }
}