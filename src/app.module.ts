import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicationsModule } from './publications/publications.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PublicationsModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:v2U1XUy9DOg0SDOq@cluster0.7focf.mongodb.net/LostAndFound?retryWrites=true&w=majority',
    ),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
