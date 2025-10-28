import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Length,
  Matches,
  MaxLength,
  IsOptional,
  IsEmpty,
} from 'class-validator';

export class ContactUsDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
  @Matches(/^[a-zA-Z\s\-'.]+$/, { message: 'Name contains invalid characters' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(255, { message: 'Email must not exceed 255 characters' })
  @Matches(/^[^\r\n]+$/, { message: 'Invalid email format' }) // Prevent CRLF injection
  email: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString()
  @Length(8, 20, { message: 'Phone must be between 8 and 20 characters' })
  @Matches(/^[0-9+\-\s()]*$/, { message: 'Invalid phone number format' })
  phone: string;

  @IsNotEmpty({ message: 'Message is required' })
  @IsString()
  @Length(10, 5000, { message: 'Message must be between 10 and 5000 characters' })
  message: string;

  // Honeypot field - should always be empty
  @IsOptional()
  @IsEmpty({ message: 'Invalid request' })
  website?: string;
}