import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from 'src/Tutorings/Domain/Model/Entities/Course.entity';

/**
 * Repository interface for managing {@link Course} entities.
 * Provides basic CRUD operations and includes additional query methods 
 * specific to courses.
 */
@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly repository: Repository<Course>
  ) {}

  /**
   * Finds a specific course by its ID.
   *
   * @param id The ID of the course to find.
   * @return The found course, or null if not found.
   */
  async findById(id: number): Promise<Course | null> {
    return this.repository.findOneBy({ id });
  }

  /**
   * Finds courses associated with a specific cycle.
   *
   * @param cycle The cycle number to filter by.
   * @return A list of courses belonging to the specified cycle.
   */
  async findByCycle(cycle: number): Promise<Course[]> {
    return this.repository.createQueryBuilder('course')
      .leftJoinAndSelect('course.semester', 'semester')
      .where('course.cycle = :cycle', { cycle })
      .getMany();
  }

  // Métodos básicos del repositorio
  async save(course: Course): Promise<Course>;
  async save(courses: Course[]): Promise<Course[]>;
  async save(courseOrCourses: Course | Course[]): Promise<Course | Course[]> {
    if (Array.isArray(courseOrCourses)) {
      return this.repository.save(courseOrCourses);
    } else {
      return this.repository.save(courseOrCourses);
    }
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  async findAll(): Promise<Course[]> {
    return this.repository.find({
      relations: ['semester']
    });
  }
}