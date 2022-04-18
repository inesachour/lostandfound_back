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
            commentOwner : createCommentDto.commentOwner,
            publication : createCommentDto.publication,
          });
          
          const result = await newComment.save();
         
          return result.id;
    }

    async findComments(publicationID: string){
      const comments = await this.commentModel.find({publication : publicationID}).exec();
      return comments;
    }
}
