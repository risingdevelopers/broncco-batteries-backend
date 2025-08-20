import { IsNotEmpty, IsString } from 'class-validator';

export class Batteries {
  @IsString()
  @IsNotEmpty({ message: 'Make is required' })
  bMake: string;

  @IsString()
  @IsNotEmpty({ message: 'Model is required' })
  bModel: string;

  @IsString()
  @IsNotEmpty({ message: 'Year is required' })
  bYear: string;

  @IsString()
  @IsNotEmpty({ message: 'Variant is required' })
  bVariant: string;
}
