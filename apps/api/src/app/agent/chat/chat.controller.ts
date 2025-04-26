import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SendMessageDto } from './chat.dto';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post()
  async message(
    @Body()
    body: SendMessageDto
  ) {
    return this.chatService.sendMessage(body);
  }

  @Get('/history/:chatId')
  async getChatHistory(@Param('chatId') chatId: string) {
    return this.chatService.getChatHistory(chatId);
  }
}
