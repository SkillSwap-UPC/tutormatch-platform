import { IsNumber, Min } from 'class-validator';

/**
 * Command to delete a tutoring session
 */
export class DeleteTutoringCommand {
  /**
   * The tutoring session ID
   * Cannot be null or less than 1
   */
  @IsNumber()
  @Min(1, { message: 'Tutoring ID cannot be less than 1' })
  readonly tutoringId: number;

  /**
   * Constructor
   * @param tutoringId the tutoring session ID
   * @throws Error if tutoringId is null or less than 1
   */
  constructor(tutoringId: number) {
    this.tutoringId = tutoringId;

    // Validation logic (alternatively, you can rely on class-validator)
    if (tutoringId === null || tutoringId <= 0) {
      throw new Error("Tutoring ID cannot be null or less than 1");
    }
  }
}