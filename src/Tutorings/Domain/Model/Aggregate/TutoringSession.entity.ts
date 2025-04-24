import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CreateTutoringSessionCommand } from '../Command/CreateTutoringSessionCommand';
import { UpdateTutoringCommand } from '../Command/UpdateTutoringCommand';
import { Course } from '../Entities/Course.entity';
import { DailySchedule } from '../Entities/DailySchedule.entity';
import { AuditableAggregateRoot } from 'src/shared/domain/model/aggregates/AuditableAbstractAggregateRoot';

/**
 * Represents a tutoring session, including details such as courseName, description,
 * price, times for availability, and association with tutor and course.
 */
@Entity()
export class TutoringSession extends AuditableAggregateRoot<TutoringSession> {
  @Column({ name: "title" })
  private title: string;

  @Column()
  private description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  private price: number;

  /**
   * List of available schedules (times) for this tutoring session.
   * Each {@link DailySchedule} instance represents available
   * hours for a specific day of the week.
   */
  @OneToMany(() => DailySchedule, (dailySchedule) => dailySchedule.tutoringSession, {
    cascade: true,
    orphanedRowAction: 'delete',
    eager: true
  })
  times: DailySchedule[]; // No inicializar aquí

  @Column({ type: 'text' })
  private image: string;

  @Column()
  private whatTheyWillLearn: string;

  /**
   * The ID of the tutor associated with this tutoring session.
   * Only users with RoleType `teacher` should have associated tutoring sessions.
   */
  @Column({ name: "tutor_id", nullable: false })
  private tutorId: number;

  /**
   * Many-to-One relationship with Course, each tutoring session
   * is associated with a specific course.
   */
  @ManyToOne(() => Course)
  @JoinColumn({ name: "course_id" })
  private course: Course;

  @Column()
  private cycle: number;

  // Getters for private properties
  public getId(): number {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPrice(): number {
    return this.price;
  }

  public getTimes(): DailySchedule[] {
    return this.times;
  }

  public getImage(): string {
    return this.image;
  }

  public getWhatTheyWillLearn(): string {
    return this.whatTheyWillLearn;
  }

  public getTutorId(): number {
    return this.tutorId;
  }

  public getCourse(): Course {
    return this.course;
  }

  public getCycle(): number {
    return this.cycle;
  }

  /**
   * Constructs a new TutoringSession instance.
   * - When called with no arguments, creates an empty instance.
   * - When called with command and course, initializes all fields.
   *
   * @param command The command containing the details to create a new tutoring session.
   * @param course The course associated with the tutoring session
   */
  constructor();
  constructor(command: CreateTutoringSessionCommand, course: Course);
  constructor(command?: CreateTutoringSessionCommand, course?: Course) {
    super();
    
    // Inicialización por defecto para evitar propiedades undefined
    this.title = '';
    this.description = '';
    this.price = 0;
    this.image = '';
    this.whatTheyWillLearn = '';
    this.tutorId = 0;
    this.cycle = 0;
    // No inicializar times aquí, ya que es una relación
    
    // Solo inicializar con datos si ambos parámetros están presentes
    if (command && course) {
      this.title = course.name;
      this.description = command.description;
      this.price = command.price;
      this.image = command.image;
      this.whatTheyWillLearn = command.whatTheyWillLearn;
      this.tutorId = command.tutorId;
      this.course = course;
      this.cycle = course.cycle;
      
      if (this.title !== course.name) {
        throw new Error("Course name does not match the courseId provided.");
      }

      // Create default schedule for all 7 days of the week
      if (command.times && command.times.length > 0) {
        // Inicializamos times solo si hay datos para asignar
        this.times = [];
        
        // Create default schedule for all 7 days
        const defaultTimes: DailySchedule[] = Array.from({ length: 7 }, (_, i) => 
          new DailySchedule(i, [])
        );

        // Override defaults with provided schedules
        for (const schedule of command.times) {
          defaultTimes[schedule.dayOfWeek] = schedule;
        }

        // Asignar cada horario a la relación
        for (const time of defaultTimes) {
          time.tutoringSession = this;
          this.times.push(time);
        }
      }
    }
  }

  /**
   * Updates the tutoring session attributes based on the provided command.
   * 
   * @param command The command containing the updated attributes
   */
  public updateTutoringSessionAttributes(command: UpdateTutoringCommand): void {
    this.description = command.description;
    this.price = command.price;
    this.image = command.image;
    this.whatTheyWillLearn = command.whatTheyWillLearn;
    
    // Clear and update times
    if (!this.times) {
      this.times = [];
    } else {
      this.times.length = 0; // Vaciar el array en lugar de crear uno nuevo
    }
    
    // Añadir los nuevos tiempos
    for (const time of command.times) {
      time.tutoringSession = this;
      this.times.push(time);
    }
  }
}