import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

/**
 * Represents a resource for updating a user's attributes.
 *
 * This class encapsulates the data required to update a user's avatar URL, gender, and semester.
 */
export class UpdateUserResource {
  @ApiProperty({ description: 'The new avatar URL for the user' })
  @IsNotEmpty({ message: 'Avatar URL cannot be empty' })
  @IsString()
  readonly avatarUrl: string;

  @ApiProperty({ description: 'The new gender of the user' })
  @IsNotEmpty({ message: 'Gender cannot be empty' })
  @IsString()
  readonly gender: string;

  @ApiProperty({ description: 'The new semester of the user' })
  @IsNumber()
  @Min(1, { message: 'Semester must be at least 1' })
  readonly semester: number;

  constructor(avatarUrl: string, gender: string, semester: number) {
    this.avatarUrl = avatarUrl;
    this.gender = gender;
    this.semester = semester;
  }
}