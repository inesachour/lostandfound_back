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
  @SubscribeMessage('chat')
  handleNewMessage(createChatDto: CreateChatDto, sender:any){   

    console.log('new chat',createChatDto);
    if (clients[createChatDto.recipient]) 
    clients[createChatDto.recipient].emit("newChat", createChatDto);
    console.log(sender.id);    
    this.chatService.create(createChatDto);
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
