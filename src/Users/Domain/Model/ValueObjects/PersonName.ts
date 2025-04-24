import { Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

export class PersonName {
  @Column('text', { name: 'first_name' })
  @IsNotEmpty({ message: 'First name cannot be empty' })
  private readonly _firstName: string;

  @Column('text', { name: 'last_name' })
  @IsNotEmpty({ message: 'Last name cannot be empty' })
  private readonly _lastName: string;

  constructor(firstName?: string, lastName?: string) {
    if (firstName && (firstName === null || firstName.trim() === '')) {
      throw new Error('First name cannot be null or blank');
    }
    if (lastName && (lastName === null || lastName.trim() === '')) {
      throw new Error('Last name cannot be null or blank');
    }
    
    this._firstName = firstName || '';
    this._lastName = lastName || '';
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  getFullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }
}