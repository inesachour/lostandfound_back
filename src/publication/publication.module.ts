import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationSchema } from './publication';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Publication', schema: PublicationSchema },
    ]),
  ],
  providers: [PublicationService],
  controllers: [PublicationController],
})
export class PublicationModule {}
