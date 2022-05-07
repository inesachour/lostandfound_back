import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './user.schema';
import { PublicationsModule } from 'src/publications/publications.module';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [
    PublicationsModule,
    CommentsModule,
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
