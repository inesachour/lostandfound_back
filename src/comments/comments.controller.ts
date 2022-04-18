import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create_comment.dto';

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
        return await this.commentsService.findComments(publicationID);
    }
}
