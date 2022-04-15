import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create_comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel('Comment')
        private readonly commentModel: Model<Comment>,
      ) {}

    async addComment(createCommentDto: CreateCommentDto){
        const newComment = new this.commentModel({
            text: createCommentDto.text,
            dateCreation : createCommentDto.dateCreation,
            owner: JSON.parse(createCommentDto.owner),
          });
          console.log(newComment);
          const result = await newComment.save();
          return result.id;
    }
}
