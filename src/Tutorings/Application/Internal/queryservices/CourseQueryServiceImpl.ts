import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from 'src/Tutorings/Domain/Model/Entities/Course.entity';
import { GetAllCoursesQuery } from '../../../Domain/Model/Queries/GetAllCoursesQuery';
import { GetCourseByCycle } from '../../../Domain/Model/Queries/GetCourseByCycle';
import { CourseQueryService } from '../../../Domain/Services/CourseQueryService';

/**
 * Service implementation for querying courses.
 *
 * Provides methods to retrieve courses based on various criteria,
 * such as all courses.
 */
@Injectable()
export class CourseQueryServiceImpl implements CourseQueryService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) {}

  /**
   * Handles different types of course queries based on the query type.
   * 
   * @param query The query object to process
   * @returns Promise with the query results
   */
  async handle(query: GetAllCoursesQuery): Promise<Course[]>;
  async handle(query: GetCourseByCycle): Promise<Course[]>;
  async handle(query: any): Promise<Course[]> {
    if (query instanceof GetAllCoursesQuery) {
      return this.handleGetAllCourses();
    }
    else if (query instanceof GetCourseByCycle) {
      return this.handleGetCourseByCycle(query);
    }
    
    return [];
  }

  /**
   * Retrieves all available courses
   * @returns A list of all courses.
   */
  private async handleGetAllCourses(): Promise<Course[]> {
    return this.courseRepository.createQueryBuilder('course')
      .leftJoinAndSelect('course.semester', 'semester')
      .getMany();
  }

  /**
   * Retrieves courses for a specific cycle.
   * @param query The query containing the cycle number
   * @returns A list of courses for the specified cycle
   */
  private async handleGetCourseByCycle(query: GetCourseByCycle): Promise<Course[]> {
    return this.courseRepository.createQueryBuilder('course')
      .where('course.cycle = :cycle', { cycle: query.cycle })
      .leftJoinAndSelect('course.semester', 'semester')
      .getMany();
  }
}