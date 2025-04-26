import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { LangchainModule } from '../../langchain/langchain.module';
import { OpenaiModule } from '../../openai/openai.module';

@Module({
  imports: [LangchainModule, OpenaiModule],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
