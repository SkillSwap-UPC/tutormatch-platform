import { Column } from 'typeorm';
import { Min, Max } from 'class-validator';

export class Semester {
  @Column('int', { name: 'semester' })
  @Min(1, { message: 'Semester must be at least 1' })
  @Max(10, { message: 'Semester must be at most 10' })
  private readonly _semester: number;

  constructor(semester: number) {
    if (semester < 1 || semester > 10) {
      throw new Error('Insert a valid Semester');
    }
    this._semester = semester;
  }

  get semester(): number {
    return this._semester;
  }
}