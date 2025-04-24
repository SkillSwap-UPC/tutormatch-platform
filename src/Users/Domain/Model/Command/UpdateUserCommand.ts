import { IsNotEmpty, IsNumber, Min } from 'class-validator';

/**
 * Represents a command to update a user's attributes.
 *
 * This class encapsulates the necessary information to update a user's avatar URL, gender, and semester.
 * It ensures that the provided attributes are valid by using validation decorators.
 */
export class UpdateUserCommand {
  /**
   * The unique identifier of the user to be updated
   */
  readonly id: number;

  /**
   * The new avatar URL for the user
   */
  @IsNotEmpty({ message: 'Avatar URL cannot be null or blank' })
  readonly avatarUrl: string;

  /**
   * The new gender of the user
   */
  @IsNotEmpty({ message: 'Gender cannot be null or blank' })
  readonly gender: string;

  /**
   * The new semester of the user
   */
  @IsNumber()
  @Min(1, { message: 'Semester must be greater than 0' })
  readonly semester: number;

  constructor(id: number, avatarUrl: string, gender: string, semester: number) {
    if (!avatarUrl || avatarUrl.trim() === '') {
      throw new Error('Avatar URL cannot be null or blank');
    }
    if (!gender || gender.trim() === '') {
      throw new Error('Gender cannot be null or blank');
    }
    if (semester <= 0) {
      throw new Error('Semester must be greater than 0');
    }
    
    this.id = id;
    this.avatarUrl = avatarUrl;
    this.gender = gender;
    this.semester = semester;
  }
}