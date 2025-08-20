import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsDateString,
  Length,
  Matches,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsOptional()
  @IsString()
  aid?: string;

  @IsNumber()
  batteryId?: number;

  @IsString()
  partNumber?: string;

  @IsString()
  ccaRating?: string;

  @IsString()
  batteryType?: string;

  @IsString()
  price?: string;

  @IsNotEmpty({ message: 'Vehicle registration number is required' })
  @IsString()
  @Length(1, 50)
  vehicleRegNum: string;

  @IsNotEmpty({ message: 'Vehicle color is required' })
  @IsString()
  @Length(1, 50)
  vehicleColor: string;

  @IsString()
  streetAddress?: string;

  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsNotEmpty({ message: 'Appointment date is required' })
  @IsDateString()
  appointmentDate: string;

  @IsString()
  appointmentTime?: string;

  @IsNotEmpty({ message: 'Full name is required' })
  @IsString()
  @Length(1, 100)
  fullName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString()
  @Length(8, 15)
  @Matches(/^[0-9+\-\s()]*$/, { message: 'Invalid phone number format' })
  phone: string;

  @IsOptional()
  @IsString()
  orderSource?: string;

  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  cancelReason?: string;

  @IsOptional()
  @IsNumber()
  userId?: number;
}
