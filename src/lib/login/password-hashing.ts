import bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  const base64 = Buffer.from(hash).toString('base64');
  return base64;
}

// [REFATORADO] Guard clause: sem hash configurado não há o que comparar,
// então falha cedo (e de forma segura) em vez de passar lixo para o bcrypt.
export async function verifyPassword(password: string, base64Hash: string) {
  if (!base64Hash) return false;

  const hash = Buffer.from(base64Hash, 'base64').toString('utf-8');
  return bcrypt.compare(password, hash);
}
