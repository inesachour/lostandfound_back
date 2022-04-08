import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PublicationsModule } from './publications/publications.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:oHh5dpmroHFFbovU@cluster0.7focf.mongodb.net/LostAndFound?retryWrites=true&w=majority',
    ),
    UsersModule,
    PublicationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
