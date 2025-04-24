import { Entity, Column, Unique } from 'typeorm';
import { AuditableAggregateRoot } from 'src/shared/domain/model/aggregates/AuditableAbstractAggregateRoot';
import { PersonName } from '../ValueObjects/PersonName';
import { EmailAddress } from '../ValueObjects/EmailAddress';
import { Password } from '../ValueObjects/Password';
import { Avatar } from '../ValueObjects/Avatar';
import { Gender } from '../ValueObjects/Gender';
import { Semester } from '../ValueObjects/UserSemester';
import { Role } from '../ValueObjects/Role';
import { RoleType } from '../ValueObjects/RoleType';
import { CreateUserCommand } from '../Command/CreateUserCommand';
import { UpdateUserCommand } from '../Command/UpdateUserCommand';

/**
 * Represents a user within the system, containing personal information and role details.
 * This entity is mapped to a database table and includes embedded value objects
 * such as PersonName, EmailAddress, Password, Avatar, Gender, Semester, and Role.
 * Inherits audit properties and behavior from AuditableAggregateRoot.
 */
@Entity('users')
export class User extends AuditableAggregateRoot<User> {

  @Column(() => PersonName)
  private name: PersonName;

  @Column(() => EmailAddress)
  private email: EmailAddress;

  @Column(() => Password)
  private password: Password;

  @Column(() => Avatar)
  private avatar: Avatar;

  @Column(() => Gender)
  private gender: Gender;

  @Column(() => Semester)
  private semester: Semester;

  @Column(() => Role)
  private role: Role;

  @Column({ type: 'integer', nullable: true })
  private tutorId: number | null;
  
  constructor();
  constructor(
    firstName: string, 
    lastName: string, 
    email: string, 
    avatarUrl: string,
    gender: string, 
    semester: number, 
    roleType: RoleType, 
    password: string
  );
  constructor(
    firstName?: string, 
    lastName?: string, 
    email?: string, 
    avatarUrl?: string,
    gender?: string, 
    semester?: number, 
    roleType?: RoleType, 
    password?: string
  ) {
    super();
    
    if (firstName && lastName && email && avatarUrl && gender && semester !== undefined && password) {
      this.name = new PersonName(firstName, lastName);
      this.email = new EmailAddress(email);
      this.avatar = new Avatar(avatarUrl);
      this.gender = new Gender(gender);
      this.semester = new Semester(semester);
      if (roleType === RoleType.TEACHER) {
        this.tutorId = null;
      }
      this.password = new Password(password);
      this.role = new Role(roleType);
    }
  }

  /**
   * Constructs a new user instance based on the provided CreateUserCommand.
   *
   * @param command a CreateUserCommand containing user data
   */
  static fromCommand(command: CreateUserCommand): User {
    const user = new User();
    user.name = new PersonName(command.firstName, command.lastName);
    user.email = new EmailAddress(command.email);
    user.password = new Password(command.password);
    user.avatar = new Avatar(command.avatarUrl);
    user.gender = new Gender(command.gender);
    user.semester = new Semester(command.semester);
    user.role = new Role(command.roleType);
    
    if (command.roleType === RoleType.TEACHER) {
      user.tutorId = null;
    }
    
    return user;
  }

  /**
   * Updates the user's attributes based on the provided command.
   *
   * This method extracts the necessary information from the UpdateUserCommand object and updates the user's
   * avatar, gender, and semester attributes.
   *
   * @param command the command containing the new user attributes
   */
  updateUserAttributes(command: UpdateUserCommand): void {
    this.avatar = new Avatar(command.avatarUrl);
    this.gender = new Gender(command.gender);
    this.semester = new Semester(command.semester);
  }

  get fullName(): string {
    return this.name.getFullName();
  }

  get emailAddress(): string {
    return this.email.address;
  }

  get passwordValue(): string {
    return this.password.password;
  }

  get avatarUrl(): string {
    return this.avatar.avatarUrl;
  }

  get genderValue(): string {
    return this.gender.gender;
  }

  get semesterValue(): number {
    return this.semester.semester;
  }

  get roleType(): RoleType {
    return this.role.roleType;
  }

  getTutorId(): number | null {
    return this.tutorId;
  }

  setTutorId(tutorId: number | null): void {
    this.tutorId = tutorId;
  }
}