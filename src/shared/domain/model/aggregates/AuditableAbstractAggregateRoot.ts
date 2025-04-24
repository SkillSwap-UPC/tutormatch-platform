import { 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';

/**
 * Base class for all aggregate roots that require auditing.
 *
 * @summary This class provides a base implementation for aggregate roots with auditing fields
 */
export abstract class AuditableAggregateRoot<T> {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
    update: false
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false
  })
  updatedAt: Date;

  private domainEvents: any[] = [];

  /**
   * Registers a domain event.
   *
   * @param event the domain event to register
   */
  public addDomainEvent(event: any): void {
    this.domainEvents.push(event);
  }

  /**
   * Get all domain events
   */
  public getDomainEvents(): any[] {
    return [...this.domainEvents];
  }

  /**
   * Clear all domain events
   */
  public clearEvents(): void {
    this.domainEvents = [];
  }
}