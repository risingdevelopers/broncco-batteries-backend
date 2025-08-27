import { Module } from '@nestjs/common';
import { ContactUsController } from './contact-us.controller';
import { ContactUsService } from './contact-us.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contacted } from './entity/contacted.entity';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  controllers: [ContactUsController],
  providers: [ContactUsService],
  imports: [
    TypeOrmModule.forFeature([Contacted]),
    MailerModule,
  ],
})
export class ContactUsModule {}
