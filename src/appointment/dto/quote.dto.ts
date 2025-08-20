import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class QuoteDto {
  @IsString()
  @IsNotEmpty({ message: 'Full Name is required' })
  fullName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Vehicle make number is required' })
  brand: string;

  @IsString()
  @IsNotEmpty({ message: 'Vehicle model is required' })
  model: string;

  @IsString()
  @IsNotEmpty({ message: 'Vehicle year is required' })
  year: string;

  @IsNotEmpty({ message: 'Appointment date is required' })
  @IsDateString()
  appointmentDate: string;

  @IsString()
  appointmentTime?: string;
}
