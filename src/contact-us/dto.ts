import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class ContactUsDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @Length(1, 100)
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString()
  @Length(8, 15)
  @Matches(/^[0-9+\-\s()]*$/, { message: 'Invalid phone number format' })
  phone: string;

  @IsNotEmpty({ message: 'Message is required' })
  @IsString()
  message: string;
}