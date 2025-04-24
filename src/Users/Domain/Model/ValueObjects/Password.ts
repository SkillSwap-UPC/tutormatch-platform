import { Column } from 'typeorm';
import { IsNotEmpty, MinLength } from 'class-validator';

export class Password {
  @Column('text', { name: 'password' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  private readonly _password: string;

  constructor(password?: string) {
    if (password) {
      if (password.trim() === '') {
        throw new Error('Password cannot be null or blank');
      }
      if (password.length <= 8) {
        throw new Error('Password must be at least 8 characters long');
      }
    }
    
    this._password = password || '';
  }

  get password(): string {
    return this._password;
  }
}