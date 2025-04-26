import { Injectable } from '@nestjs/common';

export interface News {
  text: string;
  date: string;
  link: string;
}

@Injectable()
export class NewsService {
  public news: News[] = [];

  constructor() {
    this.news.push(
      {
        text: 'Trump najavio univerzalne carine od 10% na sve uvoze, što je izazvalo globalni pad berzi',
        date: new Date('2025-04-02').toISOString(),
        link: 'https://www.businessinsider.com/trump-high-tariffs-year-from-now-would-be-total-victory-2025-4',
      },
      {
        text: 'Dow Jones pao za 1.600 poena, S&P 500 i Nasdaq zabilježili najveće gubitke od 2020.',
        date: new Date('2025-04-03').toISOString(),
        link: 'https://www.mprnews.org/story/2025/04/03/dow-drops-1600-as-us-stocks-lead-worldwide-selloff',
      },
      {
        text: 'Kina uvela uzvratne carine od 34% na američku robu',
        date: new Date('2025-04-04').toISOString(),
        link: 'https://www.euronews.ba/svijet/aktuelno/18772/kina-uvela-carine-od-34-odsto-na-svu-americku-robu',
      },
      {
        text: 'IMF smanjio globalnu prognozu rasta na 2,8% zbog trgovinskih tenzija',
        date: new Date('2025-04-22').toISOString(),
        link: 'https://www.reuters.com/business/aerospace-defense/imf-slashes-global-outlook-white-house-says-trade-talks-pick-up-pace-2025-04-22/',
      },
      {
        text: 'Trump najavio 90-dnevnu pauzu na carine za većinu zemalja, osim Kine',
        date: new Date('2025-04-09').toISOString(),
        link: 'https://vijesti.hrt.hr/gospodarstvo/trump-tvrdi-da-sad-od-carina-sada-zaraduje-dvije-milijarde-dolara-dnevno-12101800',
      },
      {
        text: 'S&P 500 izašao iz korekcije nakon tri dana rasta',
        date: new Date('2025-04-24').toISOString(),
        link: 'https://www.marketwatch.com/story/s-p-500s-rapid-exit-from-correction-territory-hinged-on-trumps-walk-back-of-tariffs-and-fed-fight-c396d1e9',
      },
      {
        text: 'FTSE 100 zabilježio najduži niz dobitaka od 2019. usred globalnih preusmjeravanja kapitala',
        date: new Date('2025-04-25').toISOString(),
        link: 'https://www.reuters.com/business/aerospace-defense/uk-shares-rise-us-china-trade-tensions-show-signs-easing-2025-04-25/',
      },
      {
        text: 'Euronext CEO: IPO tržište "zamrznuto" zbog trgovinskog rata',
        date: new Date('2025-04-25').toISOString(),
        link: 'https://www.fnlondon.com/articles/euronext-boss-says-ipo-market-frozen-after-trump-trade-war-impact-bc529cf7',
      },
      {
        text: 'Comfort Systems USA prijavio rekordne kvartalne prihode uprkos sezonskoj slabosti',
        date: new Date('2025-04-25').toISOString(),
        link: 'https://www.investors.com/news/comfort-systems-usa-record-q1-earnings-worst-season-april-2025/',
      },
      {
        text: 'Analitičar predviđa "povratak burnih 2020-ih" ako se trgovinske tenzije smanje',
        date: new Date('2025-04-24').toISOString(),
        link: 'https://www.marketwatch.com/livecoverage/stock-market-today-dow-s-p-nasdaq-dip-after-rally-on-easing-trade-and-fedangst-alphabet-earnings-due',
      }
    );
  }
}
