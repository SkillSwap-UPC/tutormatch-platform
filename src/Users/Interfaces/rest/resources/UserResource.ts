import { RoleType } from '../../../Domain/Model/ValueObjects/RoleType';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Represents the resource for a user.
 * Used for sending user data in API responses.
 */
export class UserResource {
  @ApiProperty({ description: 'The unique identifier of the user' })
  readonly id: number;

  @ApiProperty({ description: 'The full name of the user' })
  readonly fullName: string;

  @ApiProperty({ description: 'The email address of the user' })
  readonly email: string;

  @ApiProperty({ description: 'The password of the user', writeOnly: true })
  readonly password: string;

  @ApiProperty({ description: 'The URL for the avatar image of the user' })
  readonly avatarUrl: string;

  @ApiProperty({ description: 'The gender of the user' })
  readonly gender: string;

  @ApiProperty({ description: 'The current semester of the user' })
  readonly semester: number;

  @ApiProperty({ description: 'The role type of the user', enum: RoleType })
  readonly roleType: RoleType;

  @ApiProperty({ description: 'The tutor ID of the user, if applicable', nullable: true })
  readonly tutorId: number | null;

  constructor(
    id: number,
    fullName: string,
    email: string,
    password: string,
    avatarUrl: string,
    gender: string,
    semester: number,
    roleType: RoleType,
    tutorId: number | null
  ) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.avatarUrl = avatarUrl;
    this.gender = gender;
    this.semester = semester;
    this.roleType = roleType;
    this.tutorId = tutorId;
  }
}