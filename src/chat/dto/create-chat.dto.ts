
import { IsNotEmpty } from 'class-validator';
export class CreateChatDto {
    @IsNotEmpty()
    message : string;
    @IsNotEmpty()
    sender : string;
    @IsNotEmpty()
    recipient : string;
    @IsNotEmpty()
    time : string;
}
