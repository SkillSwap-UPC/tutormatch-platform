import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from './Course.entity';

/**
 * Represents an academic semester in the system, containing a collection of
 * courses offered within that semester.
 * This entity captures the semester's name and maintains a list of
 * associated courses.
 */
@Entity()
export class Semester {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /**
   * List of courses offered in this semester.
   * Mapped by the `semester` field in the Course entity.
   */
  @OneToMany(() => Course, (course) => course.semester)
  courses: Course[];

  /**
   * Constructs a new Semester with a name and a list of courses.
   *
   * @param name    The name of the semester.
   * @param courses The list of courses associated with this semester.
   */
  constructor(name?: string, courses?: Course[]) {
    if (name) this.name = name;
    if (courses) this.courses = courses;
  }
}