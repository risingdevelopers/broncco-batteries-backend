import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BatteryTypes } from './battery-types.entity';

@Entity()
export class BatteryPartNumbers {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  batteryTypeId: number;
  @Column()
  racvPartNumber: number;
  @Column()
  batteryPartNumber: string;
  @Column()
  ccaRating: string;
  @Column()
  batteryPrice: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => BatteryTypes)
  @JoinColumn({ name: 'batteryTypeId' })
  batteryTypes: BatteryTypes;
}
