import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('quote')
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  brand: string;
  @Column({ type: 'varchar', length: 255 })
  model: string;
  @Column({ type: 'varchar', length: 255 })
  year: string;

  @Column({ type: 'timestamp' })
  appointmentDate: Date;

  @Column({ type: 'varchar', nullable: true })
  appointmentTime: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
