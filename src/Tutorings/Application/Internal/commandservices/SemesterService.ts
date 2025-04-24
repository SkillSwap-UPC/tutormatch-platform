import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Semester } from 'src/Tutorings/Domain/Model/Entities/Semester.entity';
import { Course } from 'src/Tutorings/Domain/Model/Entities/Course.entity';

/**
 * Service class for managing operations related to semesters and their associated courses.
 */
@Injectable()
export class SemesterService {
  /**
   * Constructs a new SemesterService with the specified CourseRepository.
   *
   * @param courseRepository the repository used to manage course entities
   */
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) {}

  /**
   * Assigns the provided courses to the specified semester. This method updates each course's
   * semester reference and saves the updated courses to the repository.
   *
   * @param semester the semester to which the courses will be assigned
   */
  async assignCoursesToSemester(semester: Semester): Promise<void> {
    // Verifica si courses existe y no es vacío
    if (!semester.courses || semester.courses.length === 0) {
      return;
    }

    // Asigna el semestre a cada curso
    semester.courses.forEach(course => course.semester = semester);
    
    // Guarda todos los cursos
    await this.courseRepository.save(semester.courses);
  }
}