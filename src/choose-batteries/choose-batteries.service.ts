import { Injectable } from '@nestjs/common';
import { Batteries } from './Entity/batteries.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BatteryMake } from './Entity/battery-make.entity';

@Injectable()
export class ChooseBatteriesService {
  constructor(
    @InjectRepository(Batteries)
    private readonly BatteriesRepository: Repository<Batteries>,
    @InjectRepository(BatteryMake)
    private readonly BatteryMakeRepository: Repository<BatteryMake>,
  ) {}

  async getAllBatteryMake() {
    const results = await this.BatteryMakeRepository.find();
    return results.map((battery) => battery.batteryMake);
  }

  async getBatteryModels(makeName: string): Promise<string[]> {
    const results = await this.BatteriesRepository.createQueryBuilder('battery')
      .select('DISTINCT battery.bModel', 'bModel')
      .where('battery.bMake = :makeName', { makeName })
      .getRawMany();

    console.log(results);
    return results.map((battery) => battery.bModel);
  }

  async getBatteryYears(
    makeName: string,
    modelName: string,
  ): Promise<string[]> {
    console.log(makeName);
    console.log(modelName);
    const results = await this.BatteriesRepository.createQueryBuilder('battery')
      .select('DISTINCT battery.bYear', 'bYear')
      .where('battery.bMake = :makeName AND battery.bModel = :modelName', {
        makeName,
        modelName,
      })
      .getRawMany();

    return results.map((battery) => battery.bYear);
  }

  async getBatteryVariants(makeName: string, modelName: string, bYear: string) {
    const results = await this.BatteriesRepository.createQueryBuilder('battery')
      .select('DISTINCT battery.bVariant', 'bVariant')
      .where(
        'battery.bMake = :makeName AND battery.bModel = :modelName AND battery.bYear = :bYear',
        {
          makeName,
          modelName,
          bYear,
        },
      )
      .getRawMany();

    return results.map((battery) => battery.bVariant);
  }

  async getBatteryWithPartNumber(
    bMake: string,
    bModel: string,
    bYear: string,
    bVariant: string,
  ) {
    return await this.BatteriesRepository.find({
      where: {
        bMake: bMake,
        bModel: bModel,
        bYear: bYear,
        bVariant: bVariant,
      },
      relations: ['batteryPartNumber', 'batteryType'],
    });
  }
}
