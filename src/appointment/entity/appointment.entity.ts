import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Batteries } from '../../choose-batteries/Entity/batteries.entity';

@Entity('appointment')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  aid: string;

  @Column({ type: 'int' })
  batteryId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  partNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ccaRating: string;

  @Column({ type: 'varchar', length: 255 })
  batteryType: string;

  @Column({ type: 'varchar', length: 255 })
  price: string;

  @Column({ type: 'varchar', length: 50 })
  vehicleRegNum: string;

  @Column({ type: 'varchar', length: 50 })
  vehicleColor: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  streetAddress: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  zip: string;

  @Column({ type: 'timestamp' })
  appointmentDate: Date;

  @Column({ type: 'varchar', nullable: true })
  appointmentTime: string | null;

  @Column({ type: 'varchar', length: 100 })
  fullName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'varchar', length: 50 })
  orderSource: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: string;

  @Column({ type: 'text', nullable: true })
  cancelReason: string | null;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Batteries)
  @JoinColumn({ name: 'batteryId' })
  battery: Batteries;
}
