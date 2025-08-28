import crypto from 'crypto';

const KEY_ENV = process.env.FILE_ENCRYPTION_KEY;
if (!KEY_ENV || KEY_ENV.length < 32) {
  throw new Error('[PII] FILE_ENCRYPTION_KEY must be >=32 chars');
}
const KEY = Buffer.from(KEY_ENV).subarray(0, 32);

export function enc(plain: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);
  const ct = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ct]).toString('base64');
}

export function dec(b64: string): string {
  const raw = Buffer.from(b64, 'base64');
  const iv = raw.subarray(0, 12);
  const tag = raw.subarray(12, 28);
  const ct = raw.subarray(28);
  const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, iv);
  decipher.setAuthTag(tag);
  const pt = Buffer.concat([decipher.update(ct), decipher.final()]);
  return pt.toString('utf8');
}
