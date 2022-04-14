import { Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {

    constructor(private commentssService: CommentsService){}

    @Post()
    addComment(){
        return this.commentssService.addComment();
    }
}
