import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
<<<<<<< HEAD
import { UsersModule } from './users/users.module';
=======
import { PublicationsModule } from './publications/publications.module';
>>>>>>> d262d8754bdff492aa6a25c3f304ebe49f22442c

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:v2U1XUy9DOg0SDOq@cluster0.7focf.mongodb.net/LostAndFound?retryWrites=true&w=majority',
    ),
<<<<<<< HEAD
    UsersModule,
=======
    PublicationsModule,
>>>>>>> d262d8754bdff492aa6a25c3f304ebe49f22442c
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
