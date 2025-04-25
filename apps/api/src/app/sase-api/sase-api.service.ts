import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { xml2js } from 'xml-js';
import { writeFile } from 'fs/promises';
import { join } from 'path';
@Injectable()
export class SaseApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://www.sase.ba/FeedServices',
      headers: {
        Accept: 'application/xml, text/xml, */*; q=0.01',
        'Accept-Language':
          'en-GB,en;q=0.9,de-DE;q=0.8,de;q=0.7,bs-BA;q=0.6,bs;q=0.5,en-US;q=0.4,sr;q=0.3,hr;q=0.2',
        Connection: 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Origin: 'https://www.sase.ba',
        Referer:
          'https://www.sase.ba/v1/Tr%C5%BEi%C5%A1te/Emitenti/Profil-emitenta/symbol/ENISR',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'sec-ch-ua':
          '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        Cookie:
          '.ASPXANONYMOUS=wu1rzxPg2wEkAAAAOTY1ZWZhYzgtZWZhMy00NTliLWI0ZDAtZjI0YmQxY2EwNWQ30; dnn_IsMobile=False; language=bs-Latn-BA; __RequestVerificationToken_L3Yx0=PAFMqt3LUzVBMySuZDGh5bP-wmYdhIoKxKOBCcH7BqqkIS0smer0QG5ON_9wvtc0xF9zHy0RvqxLPnOPwEWP-JQ8XQLYGrIftRoRjxdD5Ny5oczu8rHjIbDiDZI1; _gid=GA1.2.420987310.1745239587; _gat_gtag_UA_60718178_1=1; _ga_MBL72YBZGB=GS1.1.1745254242.11.1.1745255823.0.0.0; _ga=GA1.1.501395531.1744225371',
      },
      withCredentials: true,
    });
  }

  async getLatestReport(ticker: string) {
    const payload = new URLSearchParams({
      id: '0',
      type: '6',
      dateFrom: '',
      dateTo: '',
      cssClass: '',
      symbol: ticker,
      Months: '2025',
      lng: '0',
      start: '0',
    });
    const response = await this.axiosInstance.post(
      '/HandlerChart.ashx',
      payload,
    );
    const xml = response.data as string;
    const data = xml2js(xml, { compact: true });
    const filePath = join(process.cwd(), `reports/${ticker}-report.json`);

    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Saved to ${filePath}`);
  }
  async getStockIndicators(ticker: string, year: string) {
    const payload = new URLSearchParams({
      id: '1',
      type: '33',
      dateFrom: '',
      dateTo: '',
      cssClass: '',
      symbol: ticker,
      Months: year,
      lng: '0',
      start: '0',
      end: '30',
    });
    const response = await this.axiosInstance.post(
      '/HandlerChart.ashx',
      payload,
    );
    const xml = response.data as string;
    const data = xml2js(xml, { compact: true });
    const filePath = join(
      process.cwd(),
      `reports/${ticker}-${year}-indicators.json`,
    );

    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Saved to ${filePath}`);
  }

  async getStockPrice(ticker: string) {
    const payload = new URLSearchParams({
      type: '4',
      symbol: ticker,
      lng: '0',
      Months: '1',
    });
    const response = await this.axiosInstance.post(
      '/HandlerChart.ashx',
      payload,
    );
    const xml = response.data as string;
    const data = xml2js(xml, { compact: true }) as any;
    return data.NewDataSet.pr_issuer_details.AvgPrice._text;
  }

  async getStockPriceBetweenDates(
    symbol: string,
    fromDate: string,
    toDate: string,
  ) {
    const payload = new URLSearchParams({
      id: '1',
      type: '2',
      dateFrom: fromDate,
      dateTo: toDate,
      cssClass: 'Chart',
      symbol: symbol,
      Months: '0',
      lng: '0',
    });
    const response = await this.axiosInstance.post(
      '/HandlerChart.ashx',
      payload,
      { headers: { Accept: 'application/json, text/javascript, */*; q=0.01' } },
    );

    const rawString = response.data;
    const decoded = rawString
      .replace(/\\u003c/g, '<')
      .replace(/\\u003e/g, '>')
      .replace(/\\u0027/g, "'")
      .replace(/\\r\\n/g, '\n');

    // 2. Nađi početak AmCharts.makeChart i izvuci config
    const match = decoded.match(
      /AmCharts\.makeChart\([^,]+,\s*({[\s\S]*})\s*\);/,
    );

    if (match) {
      let chartConfigString = match[1];

      // 3. Očisti komentare i višak zareza
      chartConfigString = chartConfigString
        .replace(/\/\*[\s\S]*?\*\//g, '') // multi-line komentari
        .replace(/\/\/[^\n\r]*/g, ''); // single-line komentari

      // 2. Ukloni višak zareza
      chartConfigString = chartConfigString
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']');

      // 3. Stavi navodnike oko ključeva
      chartConfigString = chartConfigString.replace(
        /([{,]\s*)([a-zA-Z0-9_]+)\s*:/g,
        '$1"$2":',
      );

      // 4. Zamijeni '-' literal sa stringom "-"
      chartConfigString = chartConfigString.replace(/'-'/g, '"-"');
      // 4. Stavi navodnike oko ključeva
      chartConfigString = chartConfigString.replace(
        /([{,]\s*)([a-zA-Z0-9_]+)\s*:/g,
        '$1"$2":',
      );

      // 5. Pokušaj parsirati

      const chart = JSON.parse(chartConfigString.replaceAll("'-'", '"-"'));
      return chart.dataSets;
    }
  }
}
