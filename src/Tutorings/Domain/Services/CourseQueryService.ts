import { Course } from '../Model/Entities/Course.entity';
import { GetAllCoursesQuery } from '../Model/Queries/GetAllCoursesQuery';
import { GetCourseByCycle } from '../Model/Queries/GetCourseByCycle';

/**
 * Service interface for handling queries related to courses.
 * Provides methods for retrieving course information.
 */
export interface CourseQueryService {
  /**
   * Retrieves all available courses.
   *
   * @param query The query object (unused in this implementation).
   * @return A list of all courses.
   */
  handle(query: GetAllCoursesQuery): Promise<Course[]>;

  /**
   * Retrieves courses associated with a specific cycle.
   *
   * @param query The query object containing the cycle number.
   * @return A list of courses belonging to the specified cycle.
   */
  handle(query: GetCourseByCycle): Promise<Course[]>;
}