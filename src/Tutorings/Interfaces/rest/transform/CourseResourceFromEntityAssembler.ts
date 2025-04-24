import { Course } from 'src/Tutorings/Domain/Model/Entities/Course.entity';
import { CourseResource } from '../resources/CourseResource';

/**
 * Assembles a resource representation of a course from the provided entity.
 */
export class CourseResourceFromEntityAssembler {
  /**
   * Converts a Course entity into a CourseResource.
   *
   * @param entity The entity representing the course
   * @returns A resource representation of the course
   */
  static toResourceFromEntity(entity: Course): CourseResource {
    return new CourseResource(
      entity.id,
      entity.name,
      entity.description,
      entity.cycle
    );
  }
}