import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create_comment.dto';

@Controller('comments')
export class CommentsController {

    constructor(private commentsService: CommentsService){}

    @Post()
    async addComment(@Body() createCommentDto: CreateCommentDto){
        console.log("hya");
        
        const newComment = await this.commentsService.addComment(createCommentDto,);
        return newComment;
    }
}
