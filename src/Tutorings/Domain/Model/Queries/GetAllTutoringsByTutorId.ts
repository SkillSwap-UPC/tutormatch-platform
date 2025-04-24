import { IsNumber, Min } from 'class-validator';

/**
 * Represents a query to retrieve all tutoring sessions conducted by a specific tutor.
 */
export class GetAllTutoringsByTutorId {
  /**
   * The ID of the tutor whose tutoring sessions to retrieve.
   */
  @IsNumber()
  @Min(1, { message: 'Tutor ID must be at least 1' })
  readonly tutorId: number;

  /**
   * Constructor
   * @param tutorId The ID of the tutor.
   */
  constructor(tutorId: number) {
    this.tutorId = tutorId;
  }
}