import { IsNumber, Min } from 'class-validator';

/**
 * Represents a query to retrieve tutoring sessions associated with a specific semester.
 */
export class GetTutoringBySemesterId {
  /**
   * The cycle number of the semester.
   */
  @IsNumber()
  @Min(1, { message: 'Cycle must be at least 1' })
  readonly cycle: number;

  /**
   * Constructor
   * @param cycle The cycle number of the semester.
   */
  constructor(cycle: number) {
    this.cycle = cycle;
  }
}