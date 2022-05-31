import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypegooseModule } from 'nestjs-typegoose';
import { Chat } from './entities/chat.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypegooseModule.forFeature([Chat]),UsersModule],
  providers: [ChatGateway, ChatService]
})
export class ChatModule {}
