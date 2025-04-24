import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsNumber, Min, IsEnum } from 'class-validator';
import { RoleType } from '../../../Domain/Model/ValueObjects/RoleType';

/**
 * Represents the resource for creating a new user.
 * Used to receive and validate user creation data in API requests.
 */
export class CreateUserResource {
  @ApiProperty({ description: 'The first name of the user' })
  @IsNotEmpty({ message: 'First name cannot be empty' })
  @IsString()
  readonly firstName: string;

  @ApiProperty({ description: 'The last name of the user' })
  @IsNotEmpty({ message: 'Last name cannot be empty' })
  @IsString()
  readonly lastName: string;

  @ApiProperty({ description: 'The email address of the user' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @ApiProperty({ description: 'The password for the user' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'The URL for the avatar image of the user' })
  @IsNotEmpty({ message: 'Avatar URL cannot be empty' })
  @IsString()
  readonly avatarUrl: string;

  @ApiProperty({ description: 'The gender of the user' })
  @IsNotEmpty({ message: 'Gender cannot be empty' })
  @IsString()
  readonly gender: string;

  @ApiProperty({ description: 'The current semester of the user' })
  @IsNumber()
  @Min(1, { message: 'Semester must be at least 1' })
  readonly semester: number;

  @ApiProperty({ description: 'The role type of the user', enum: RoleType })
  @IsEnum(RoleType, { message: 'Role type must be either student or teacher' })
  readonly roleType: RoleType;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatarUrl: string,
    gender: string,
    semester: number,
    roleType: RoleType
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.avatarUrl = avatarUrl;
    this.gender = gender;
    this.semester = semester;
    this.roleType = roleType;
  }
}