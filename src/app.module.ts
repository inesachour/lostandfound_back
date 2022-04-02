import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:v2U1XUy9DOg0SDOq@cluster0.7focf.mongodb.net/LostAndFound?retryWrites=true&w=majority',
    ),
    PublicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
