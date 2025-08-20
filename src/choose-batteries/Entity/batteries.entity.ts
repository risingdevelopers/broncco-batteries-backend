import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn, ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BatteryTypes } from './battery-types.entity';
import { BatteryPartNumbers } from './battery-part-numbers.entity';

@Entity()
export class Batteries {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;
  @Column()
  bMake: string;
  @Column()
  bModel: string;
  @Column()
  bYear: string;
  @Column()
  bVariant: string;
  @Column()
  batteryTypeId: number;
  @Column()
  bPartNumber: string;
  @Column()
  bPartNumberId: number;
  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => BatteryTypes)
  @JoinColumn({ name: 'batteryTypeId' })
  batteryType: BatteryTypes;

  @ManyToOne(() => BatteryPartNumbers)
  @JoinColumn({ name: 'bPartNumberId' })
  batteryPartNumber: BatteryPartNumbers;
}
