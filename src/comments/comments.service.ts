import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create_comment.dto';
import { UpdateCommentDto } from './dto/update_comment.dto';

@Injectable()
export class CommentsService {
    async deleteCommentByPub(id: string) {
      const result = await this.commentModel.deleteMany({publication:id});
      return result;
    }
    async deleteComment(id: string) {
      const result = await this.commentModel.deleteOne({_id:id});
      return result;
    }
    async updateComment(id: string,updateCommentDto:UpdateCommentDto) {
      const result = await this.commentModel.findByIdAndUpdate(id,{text:updateCommentDto.text,dateModification:Date()})
      return result;
    }
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

  async deleteCommentsByUserId(id: string) {
    const result = await this.commentModel.deleteMany({ commentOwner: id });
    return result;
  }
}
