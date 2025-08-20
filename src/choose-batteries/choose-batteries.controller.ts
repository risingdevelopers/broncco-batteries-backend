import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChooseBatteriesService } from './choose-batteries.service';
import { Batteries } from './dto/Batteries.dto';

@Controller('choose-batteries')
export class ChooseBatteriesController {
  constructor(public chooseBatteryService: ChooseBatteriesService) {}

  @Get('batteryMakes')
  async getAllBatteryMakes() {
    return await this.chooseBatteryService.getAllBatteryMake();
  }

  @Get('batteryModels/:makeName')
  async getBatteryModel(@Param('makeName') makeName: string) {
    return await this.chooseBatteryService.getBatteryModels(makeName);
  }

  @Get('batteryYears/:makeName/:modelName')
  async getBatteryYear(
    @Param('makeName') makeName: string,
    @Param('modelName') modelName: string,
  ) {
    return this.chooseBatteryService.getBatteryYears(makeName, modelName);
  }

  @Get('batteryVariants/:makeName/:modelName/:bYear')
  async getBatteryVariant(
    @Param('makeName') makeName: string,
    @Param('modelName') modelName: string,
    @Param('bYear') bYear: string,
  ) {
    return this.chooseBatteryService.getBatteryVariants(
      makeName,
      modelName,
      bYear,
    );
  }
  @Post('query')
  async getBatteries(@Body() batteries: Batteries) {
    return this.chooseBatteryService.getBatteryWithPartNumber(
      batteries.bMake,
      batteries.bModel,
      batteries.bYear,
      batteries.bVariant,
    );
  }
}
