import type { Express, Request, Response } from 'express';
import multer from 'multer';
import { assertClean } from '../security/antivirus';
import { quarantineFile } from '../utils/quarantine';

const upload = multer({ storage: multer.memoryStorage() });

export function registerUploadRoutes(app: Express) {
  app.post('/api/upload', upload.single('file'), async (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    try {
      await assertClean(file.buffer);
      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      await quarantineFile(file.buffer, file.originalname);
      res.status(422).json({ error: 'File failed antivirus scan' });
    }
  });
}
