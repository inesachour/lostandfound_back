import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create_comment.dto';
import { UpdateCommentDto } from './dto/update_comment.dto';

@Controller('comments')
export class CommentsController {

    constructor(private commentsService: CommentsService){}

    @Post()
    async addComment(@Body() createCommentDto: CreateCommentDto){
        
        const newComment = await this.commentsService.addComment(createCommentDto,);
        return newComment;
    }

    @Get('/:publicationID')
    async findComments(@Param('publicationID') publicationID: string){
        const result = await this.commentsService.findComments(publicationID);
        console.log(result);
        return result;
    }


    @Patch("/:id")
    async updateComment(@Param("id") id: string,@Body() updateCommentDto:UpdateCommentDto )
    {
        return await this.commentsService.updateComment(id,updateCommentDto);
    }

    @Delete("/:id")
    async deleteComment(@Param("id") id: string)
    {
        return await this.commentsService.deleteComment(id);
    }

}

