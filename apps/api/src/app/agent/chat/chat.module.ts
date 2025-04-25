import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { LangchainModule } from '../../langchain/langchain.module';

@Module({
  imports: [LangchainModule],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
