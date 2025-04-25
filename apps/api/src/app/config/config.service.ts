import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get companies() {
    return [
      {
        symbol: 'BHTSR',
        name: 'BH Telecom',
        logo: 'https://www.sase.ba/v1/DesktopModules/CorpData/images/BHTS.jpg',
      },
      {
        symbol: 'BSNLR',
        name: 'Bosnalijek',
        logo: 'https://www.sase.ba/v1/DesktopModules/CorpData/images/BSNL.jpg',
      },
      {
        symbol: 'ENISR',
        name: 'Energoinvest d.d. Sarajevo',
        logo: 'https://www.sase.ba/v1/DesktopModules/CorpData/images/ENIS.jpg',
      },
      // {
      //   symbol: 'IKBZRK2',
      //   name: 'ASA Banka',
      //   logo: 'https://www.asabanka.ba/wp-content/themes/asa/images/logo.svg',
      // },
      // {
      //   symbol: 'JPEMR',
      //   name: 'JP Elektroprivreda HZHB Mostar',
      //   logo: 'https://ephzhb.ba/wp-content/themes/ephzhb/img/logo.svg',
      // },
    ];
  }

  get openAiApiKey() {
    return this.configService.get('OPENAI_API_KEY');
  }

  get assistants() {
    const assistants = {};

    this.companies.forEach((company) => {
      assistants[company.symbol] = this.configService.get(
        `ASSISTANT_${company.symbol}`
      );
    });

    return assistants;
  }

  get mainAssistant() {
    return this.configService.get('ASSISTANT_MAIN');
  }
}
