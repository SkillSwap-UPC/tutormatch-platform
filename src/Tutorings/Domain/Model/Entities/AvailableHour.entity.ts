import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DailySchedule } from './DailySchedule.entity';

/**
 * Represents an available hour time slot for a daily schedule.
 * This entity serves as the element collection for DailySchedule's availableHours.
 */
@Entity()
export class AvailableHour {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The time slot string, e.g., "10-11" representing 10:00-11:00.
   */
  @Column()
  timeSlot: string;

  /**
   * The daily schedule that this available hour belongs to.
   */
  @ManyToOne(() => DailySchedule, dailySchedule => dailySchedule.availableHours, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: "daily_schedule_id" })
  dailySchedule: DailySchedule;

  /**
   * Constructs a new AvailableHour with the specified time slot.
   *
   * @param timeSlot The time slot string (e.g., "10-11")
   * @param dailySchedule The daily schedule this hour belongs to
   */
  constructor(timeSlot?: string, dailySchedule?: DailySchedule) {
    if (timeSlot) this.timeSlot = timeSlot;
    if (dailySchedule) this.dailySchedule = dailySchedule;
  }
}