import { Request, Response, NextFunction } from 'express';
import { AVScanner } from 'real-antivirus-package';  // استبدل بـ حزمة فحص حقيقي مثل ClamAV أو أي فحص آخر.

// فحص الفيروسات الحقيقي
export const fileUpload = (req: Request, res: Response, next: NextFunction) => {
  const file = (req as any).file;
  const scanner = new AVScanner();
  scanner.scan(file, (err: any, result: { isSafe: boolean }) => {
    if (err || !result.isSafe) {
      return res.status(400).json({ error: "File scan failed." });
    }
    // عملية الرفع هنا
    next();
  });
};
