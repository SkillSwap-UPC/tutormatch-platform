import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Semester } from './Semester.entity';

/**
 * Represents a course offered within a specific semester in the academic curriculum.
 * Contains details about the course, including name, description, cycle (semester),
 * and association with a particular semester.
 */
@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  /**
   * The semester (cycle) this course is part of.
   */
  @Column()
  cycle: number;

  /**
   * The semester in which this course is offered.
   * Mapped to the Semester entity to reflect academic terms.
   */
  @ManyToOne(() => Semester, (semester) => semester.courses)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;

  /**
   * Returns the ID of the course.
   * 
   * @returns The course ID
   */
  getId(): number {
    return this.id;
  }

  /**
   * Constructs a new course with specified details.
   *
   * @param name        The name of the course.
   * @param description The description of the course.
   * @param cycle       The academic cycle in which the course is offered.
   * @param semester    The semester in which this course is offered.
   */
  constructor(name?: string, description?: string, cycle?: number, semester?: Semester) {
    if (name) this.name = name;
    if (description) this.description = description;
    if (cycle) this.cycle = cycle;
    if (semester) this.semester = semester;
  }
}