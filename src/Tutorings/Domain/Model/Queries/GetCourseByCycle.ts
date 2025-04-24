import { IsNumber, Min } from 'class-validator';

/**
 * Represents a query to retrieve courses associated with a specific academic cycle.
 */
export class GetCourseByCycle {
  /**
   * The cycle number to retrieve courses for.
   */
  @IsNumber()
  @Min(1, { message: 'Cycle must be at least 1' })
  readonly cycle: number;

  /**
   * Constructor
   * @param cycle The cycle number.
   */
  constructor(cycle: number) {
    this.cycle = cycle;
  }
}