import { Column } from 'typeorm';
import { IsEmail } from 'class-validator';

export class EmailAddress {
  @Column('text', { name: 'email_address', unique: true })
  @IsEmail({}, { message: 'Invalid email format' })
  private readonly _address: string;

  constructor(address: string) {
    if (!address || address.trim() === '') {
      throw new Error('Email address cannot be null or blank');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(address)) {
      throw new Error('Invalid email format');
    }
    
    this._address = address;
  }

  get address(): string {
    return this._address;
  }
}