import { Module } from '@nestjs/common';
import { ChooseBatteriesController } from './choose-batteries.controller';
import { ChooseBatteriesService } from './choose-batteries.service';
import { Batteries } from './Entity/batteries.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatteryTypes } from './Entity/battery-types.entity';
import { BatteryPartNumbers } from './Entity/battery-part-numbers.entity';
import { BatteryMake } from './Entity/battery-make.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Batteries,
      BatteryTypes,
      BatteryPartNumbers,
      BatteryMake,
    ]),
  ],
  controllers: [ChooseBatteriesController],
  providers: [ChooseBatteriesService],
})
export class ChooseBatteriesModule {}
