import { IsEmail, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { RoleType } from '../ValueObjects/RoleType';

/**
 * Command for creating a new user, encapsulating the required user details.
 * This command object is used to transfer data needed to create a User.
 */
export class CreateUserCommand {
  /**
   * The first name of the user
   */
  @IsNotEmpty()
  readonly firstName: string;

  /**
   * The last name of the user
   */
  @IsNotEmpty()
  readonly lastName: string;

  /**
   * The user's email address
   */
  @IsEmail()
  readonly email: string;

  /**
   * The user's password
   */
  @IsNotEmpty()
  readonly password: string;

  /**
   * The URL for the user's avatar image
   */
  @IsNotEmpty()
  readonly avatarUrl: string;

  /**
   * The gender of the user
   */
  @IsNotEmpty()
  readonly gender: string;

  /**
   * The current semester of the user
   */
  @IsNumber()
  @Min(1)
  readonly semester: number;

  /**
   * The role type of the user (e.g., student, teacher)
   */
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