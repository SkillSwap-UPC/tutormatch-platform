import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TutoringSession } from '../Aggregate/TutoringSession.entity';
import { AvailableHour } from './AvailableHour.entity';

/**
 * Represents the daily schedule for available tutoring hours on a specific day of the week.
 * Each instance specifies a day and the corresponding hours when tutoring is available.
 */
@Entity()
export class DailySchedule {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The day of the week for this schedule.
   * 0 = Sunday, 1 = Monday, ..., 6 = Saturday.
   */
  @Column()
  dayOfWeek: number;

  /**
   * List of available hours on this day.
   * Each entry in the list represents a time slot, e.g., ["10-11", "11-12"].
   * Stored in a separate table through a one-to-many relationship.
   */
  @OneToMany(() => AvailableHour, availableHour => availableHour.dailySchedule, {
    cascade: true,
    eager: true
  })
  availableHours: AvailableHour[];

  /**
   * The tutoring session that owns this schedule.
   */
  @ManyToOne(() => TutoringSession, (tutoringSession) => tutoringSession.times)
  @JoinColumn({ name: "tutoring_session_id" })
  tutoringSession: TutoringSession;

  /**
   * Constructs a new DailySchedule with the specified day of the week and available hours.
   *
   * @param dayOfWeek      The day of the week (0-6) for this schedule.
   * @param availableHourStrings List of available time slots on this day.
   */
  constructor(dayOfWeek?: number, availableHourStrings?: string[]) {
    if (dayOfWeek !== undefined) this.dayOfWeek = dayOfWeek;
    
    // NO inicializar el array aquí, se creará después si es necesario
    
    // Si se proporcionan strings de horas, asignar después de la creación del objeto
    if (availableHourStrings && availableHourStrings.length > 0) {
      // Llamar al método después de que el objeto haya sido creado
      this.setAvailableHourStrings(availableHourStrings);
    }
  }

  /**
   * Gets the available hours as an array of strings for easier handling.
   */
  getAvailableHourStrings(): string[] {
    if (!this.availableHours) return [];
    return this.availableHours.map(hour => hour.timeSlot);
  }

  /**
   * Sets the available hours from an array of strings.
   */
  setAvailableHourStrings(hours: string[]): void {
    // Crear el array si no existe
    if (!this.availableHours) {
      this.availableHours = [];
    } else {
      // Limpiarlo si ya existe
      this.availableHours.length = 0;
    }
    
    // Crear nuevas entidades para cada hora
    for (const hour of hours) {
      const availableHour = new AvailableHour(hour, this);
      this.availableHours.push(availableHour);
    }
  }
}