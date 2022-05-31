import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from './comments.controller';
import { CommentSchema } from './comments.model';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Comment', schema: CommentSchema },
    ]),
  ],
  exports: [CommentsService],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
