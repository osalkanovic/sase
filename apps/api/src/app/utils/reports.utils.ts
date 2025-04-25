import * as fs from 'fs';
import * as path from 'path';

export class ReportsUtils {
  static async deleteAllFiles() {
    const folder = path.join(process.cwd(), 'reports');
    try {
      const files = await fs.promises.readdir(folder);
      for (const file of files) {
        const filePath = path.join(folder, file);
        const stat = await fs.promises.lstat(filePath);
        if (stat.isFile()) {
          await fs.promises.unlink(filePath);
        }
      }
      console.log('All files deleted from reports folder.');
    } catch (err) {
      console.error('Error while deleting files:', err);
    }
  }
}
