import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BatteryTypes {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;
  @Column()
  batteryPrice: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
