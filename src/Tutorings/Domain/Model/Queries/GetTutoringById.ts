import { IsNumber, Min } from 'class-validator';

/**
 * Represents a query to retrieve a specific tutoring session by its ID.
 */
export class GetTutoringById {
  /**
   * The ID of the tutoring session to retrieve.
   */
  @IsNumber()
  @Min(1, { message: 'ID must be at least 1' })
  readonly id: number;

  /**
   * Constructor
   * @param id The ID of the tutoring session to retrieve.
   */
  constructor(id: number) {
    this.id = id;
  }
}