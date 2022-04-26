import { PickType } from "@nestjs/mapped-types";
import { CreateCommentDto } from "./create_comment.dto";

export class UpdateCommentDto extends PickType(CreateCommentDto, ["text"]){}