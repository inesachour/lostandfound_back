import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://safa:jiVK2P7q9QPcHaUB@cluster0.rhacs.mongodb.net/lostandfound?retryWrites=true&w=majority',
    ),
    PublicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
