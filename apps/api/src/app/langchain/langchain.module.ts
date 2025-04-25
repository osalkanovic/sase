import { Module } from '@nestjs/common';
import { LangchainToolProvider } from './langchain-tool.provider';
import { SaseApiModule } from '../sase-api/sase-api.module';
import { StocksModule } from '../stocks/stocks.module';

@Module({
  imports: [SaseApiModule, StocksModule],
  providers: [LangchainToolProvider],
  exports: [LangchainToolProvider],
})
export class LangchainModule {}
