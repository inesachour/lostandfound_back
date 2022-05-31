import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PublicationsModule } from './publications/publications.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { ChatModule } from './chat/chat.module';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:oHh5dpmroHFFbovU@cluster0.7focf.mongodb.net/LostAndFound?retryWrites=true&w=majority',
    ),
    TypegooseModule.forRoot(
      'mongodb+srv://admin:oHh5dpmroHFFbovU@cluster0.7focf.mongodb.net/LostAndFound?retryWrites=true&w=majority'
    ),
    AuthModule, 
    UsersModule,
    PublicationsModule,
    CommentsModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
