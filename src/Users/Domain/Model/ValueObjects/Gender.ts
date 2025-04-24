import { Column } from 'typeorm';
import { IsIn } from 'class-validator';

export class Gender {
  @Column('text', { name: 'gender' })
  @IsIn(['male', 'female'], { message: 'Gender must be either male or female' })
  private readonly _gender: string;

  constructor(gender?: string) {
    if (gender) {
      if (gender.trim() === '') {
        throw new Error('Gender cannot be null or blank');
      }
      if (!['male', 'female'].includes(gender.toLowerCase())) {
        throw new Error('Invalid gender value');
      }
    }
    
    this._gender = gender || '';
  }

  get gender(): string {
    return this._gender;
  }
}