import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SaseApiModule } from './sase-api/sase-api.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './config/config.module';
import { OpenaiModule } from './openai/openai.module';
import { ChatModule } from './agent/chat/chat.module';
import { LangchainModule } from './langchain/langchain.module';
import { StocksModule } from './stocks/stocks.module';
import { ResendModule } from './resend/resend.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SaseApiModule,
    AppConfigModule,
    OpenaiModule,
    ChatModule,
    LangchainModule,
    StocksModule,
    ResendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
