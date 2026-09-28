import crypto from 'crypto';

export function encrypt(text: string): string {
  const raw = process.env.MT5_ENCRYPTION_SECRET;
  if (!raw) throw new Error('MT5_ENCRYPTION_SECRET not set');
  const secret = raw.trim();
  if (secret.length !== 32) throw new Error(`Secret must be 32 chars, got ${secret.length}`);

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(secret), iv);
  let enc = cipher.update(text, 'utf8', 'hex');
  enc += cipher.final('hex');
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${tag.toString('hex')}:${enc}`;
}

export function decrypt(data: string): string {
  const raw = process.env.MT5_ENCRYPTION_SECRET;
  if (!raw) throw new Error('MT5_ENCRYPTION_SECRET not set');
  const secret = raw.trim();
  const [ivHex, tagHex, enc] = data.split(':');
  const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(secret), Buffer.from(ivHex, 'hex'));
  decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
  let dec = decipher.update(enc, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}
