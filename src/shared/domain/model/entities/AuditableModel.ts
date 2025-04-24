import { 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  Column 
} from 'typeorm';

export abstract class AuditableModel {
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
}