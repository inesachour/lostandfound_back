import { Injectable } from '@nestjs/common';
import { ReturnModelType} from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {


  constructor(
    @InjectModel(Chat) private readonly ChatModel : ReturnModelType<typeof Chat>
  ){}



  async create(createChatDto: CreateChatDto) : Promise<Chat> {
    const createdChat = new this.ChatModel(createChatDto);
    return await createdChat.save();
  }

  async findAll() : Promise<Chat[]> {
    return await this.ChatModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  async findByClient(id:any) {
    console.log("findByClient");
    var res1=[];
    const result = await this.ChatModel.find().exec();
    for(var i =0;i<result.length;i++)
      if ((result[i].sender==id.myID && result[i].recipient==id.otherID )||(result[i].sender==id.otherID && result[i].recipient==id.myID))
       {
         res1.push(result[i]);
        }
    console.log(res1);
    
    return res1;
  }
  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }
  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
