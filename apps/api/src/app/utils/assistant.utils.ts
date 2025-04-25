import { promises as fs } from 'fs';
import { join } from 'path';

export class AssistantUtils {
  static async saveToEnv(
    assistants: Record<string, string>,
    mainAssistant: string
  ) {
    const envPath = join(process.cwd(), 'apps', 'api', '.env');

    let existingEnv = '';
    try {
      existingEnv = await fs.readFile(envPath, { encoding: 'utf8' });
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }

    const filteredEnv = existingEnv
      .split('\n')
      .filter((line) => !line.startsWith('ASSISTANT_') && line.trim() !== '')
      .join('\n');

    const assistantsEnv = Object.entries(assistants)
      .map(([key, id]) => `ASSISTANT_${key}=${id}`)
      .join('\n');

    const mainEnv = `ASSISTANT_MAIN=${mainAssistant}`;

    const finalEnv =
      [filteredEnv, assistantsEnv, mainEnv].filter(Boolean).join('\n') + '\n';

    await fs.writeFile(envPath, finalEnv, { encoding: 'utf8' });
  }

  static extractJsonFromResponse(response: string) {
    const match = response.match(/{[\s\S]*}/);
    if (!match) {
      throw new Error('No JSON found in response');
    }
    return JSON.parse(match[0]);
  }
}
