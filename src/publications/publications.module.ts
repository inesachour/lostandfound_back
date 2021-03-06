import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationSchema } from './publications.model';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Publication', schema: PublicationSchema },
    ]),
    HttpModule,
  ],
  exports: [PublicationsService],
  controllers: [PublicationsController],
  providers: [PublicationsService],
})
export class PublicationsModule {}
