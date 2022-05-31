import { Bind } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody,ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

 ///test
 var clients={};

@WebSocketGateway()
export class ChatGateway {
 
  constructor(private readonly chatService: ChatService) {}

  afterInit(
    server: any
    ): void
  {
  // console.log("Init",server);
  }
   handleConnection(socket:any){
    let id;
     socket.on("signin",async (idObj)=>{
     id=idObj;
     clients[id.myID] = socket;
    const res = await this.chatService.findByClient(id);
    socket.emit("allChats",JSON.stringify(res))
  })
  // clients[socket.id] = socket;
   // process.nextTick(()=>{
   //   socket.emit("allChats",this.chatService.findByClient(id))
    //});
  }

  handleDisconnect(socket:any)
  {
    console.log("Disconnect",socket);
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('try')
  async try(id:any,sender:any)
  {    
    console.log("d5alt");
    //console.log(await this.chatService.try());
   

    const chats= await this.chatService.try(id);
    console.log(chats);
    
    sender.emit("conversation", chats )
  }

 /* @SubscribeMessage('conversation')
  async getConversations(@MessageBody() obj: any) {
    return await this.chatService.try(obj.myID)
    }
*/

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('chat')
  async handleNewMessage(createChatDto: CreateChatDto, sender:any){   

    console.log('new chat',createChatDto);
    if (clients[createChatDto.recipient]) 
    {
      clients[createChatDto.recipient].emit("newChat", createChatDto);
    }
    if (clients[createChatDto.sender]) 
    {
      clients[createChatDto.sender].emit("newChat", createChatDto);
    }
    console.log(sender.id);    
    console.log(await this.chatService.create(createChatDto));
    console.log("hiii");
    

    
    //sender.emit("newChat",createChatDto);
    //sender.broadcast.emit("newChat",createChatDto);
  }


  ///////////////////////////////////////
  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }
  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }


  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }



  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
