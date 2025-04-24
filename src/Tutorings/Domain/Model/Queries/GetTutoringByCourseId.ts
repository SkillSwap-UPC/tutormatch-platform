import { IsNumber, Min } from 'class-validator';

/**
 * Represents a query to retrieve tutoring sessions associated with a specific course.
 */
export class GetTutoringByCourseId {
  /**
   * The ID of the course whose tutoring sessions to retrieve.
   */
  @IsNumber()
  @Min(1, { message: 'Course ID must be at least 1' })
  readonly courseId: number;

  /**
   * Constructor
   * @param courseId The ID of the course.
   */
  constructor(courseId: number) {
    this.courseId = courseId;
  }
}