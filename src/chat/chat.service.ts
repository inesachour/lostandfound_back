import { Injectable } from '@nestjs/common';
import { ReturnModelType} from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { UsersService } from 'src/users/users.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {


  constructor(
    @InjectModel(Chat) private readonly ChatModel : ReturnModelType<typeof Chat>,
    private usersService: UsersService
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
    const result = await this.ChatModel.find({$or:[{sender:id.myID,recipient:id.otherID},{sender:id.otherID,recipient:id.myID}]}).exec();
    return result;
  }
  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }
  remove(id: number) {
    return `This action removes a #${id} chat`;
  }



  async try(id:any) {
    console.log("try")
    console.log(id)
    var chats= await this.ChatModel.find({$or:[{sender:id},{recipient:id}]}).exec();
    console.log("chats"+chats);
    let chats1=[];
    chats.forEach((element)=>{
      if(element.sender != id )
      chats1.push(element.sender);
      else
      chats1.push(element.recipient);
    });
    
    console.log(chats1);
    
    let chatsUniq = chats1.filter((item, i, ar) => ar.indexOf(item) === i);

    let result = []; 

    console.log("chatsUniq"+chatsUniq);


    for(var i=0;i<chatsUniq.length;i++)
      {
        console.log(chatsUniq[i]);
        
      let lastMsg = await this.ChatModel
          .findOne({$or:[{sender:id,recipient:chatsUniq[i]},{sender:chatsUniq[i],recipient:id}]})
            .sort({_id:"descending"}).exec();
      let otherUser = await this.usersService.findUserById(chatsUniq[i]);
      otherUser["photo"] = JSON.stringify(otherUser.photo);
      console.log(otherUser);
      result.push({"lastMsg":lastMsg,"otherUser":otherUser});
      }
    return result;
    
  }
}
