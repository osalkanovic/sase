import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { AppConfigService } from '../config/config.service';

@Injectable()
export class OpenaiService {
  constructor(private readonly appConfigService: AppConfigService) {
    this.openai = new OpenAI({
      apiKey: this.appConfigService.openAiApiKey,
    });
  }
  public openai: OpenAI;

  async test() {
    const messages = await this.openai.beta.threads.messages.list(
      'thread_mwDGtIqeaormNyn1U9AxMN7p'
    );
    messages.data.forEach((m) => {
      console.log(m.content[0]);
    });
  }

  async uploadReports() {
    const reportsDir = path.join(process.cwd(), 'reports');
    const files = fs.readdirSync(reportsDir);
    const fileIds: string[] = [];
    for (const file of files) {
      const filePath = path.join(reportsDir, file);

      if (path.extname(file) === '.json') {
        const fileStream = fs.createReadStream(filePath);

        const response = await this.openai.files.create({
          file: fileStream,
          purpose: 'assistants',
        });
        fileIds.push(response.id);
      }
    }

    const vectorStore = await this.openai.vectorStores.create({
      name: 'SASE REPORTS',
      file_ids: fileIds,
    });
    return vectorStore.id;
  }
}
