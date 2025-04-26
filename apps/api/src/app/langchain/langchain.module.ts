import { Module } from '@nestjs/common';
import { LangchainToolProvider } from './langchain-tool.provider';
import { SaseApiModule } from '../sase-api/sase-api.module';
import { StocksModule } from '../stocks/stocks.module';
import { NewsModule } from '../news/news.module';

@Module({
  imports: [SaseApiModule, StocksModule, NewsModule],
  providers: [LangchainToolProvider],
  exports: [LangchainToolProvider],
})
export class LangchainModule {}
