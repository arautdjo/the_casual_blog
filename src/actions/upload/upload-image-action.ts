'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

type UploadImageActionResult = {
  url: string;
  error: string;
};

const DEFAULT_MAX_UPLOAD_BYTES = 921_600;

const ok = (url: string): UploadImageActionResult => ({ url, error: '' });
const fail = (error: string): UploadImageActionResult => ({ url: '', error });

// [REFATORADO]
// - `ok` / `fail` no lugar do `makeResult({ ... })` criado a cada chamada.
// - Constantes nomeadas (sem "número mágico" 921600).
// - Variáveis intermediárias que só eram usadas uma vez foram inlinadas.
export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  if (!(await verifyLoginSession())) return fail('Faça login novamente');
  if (!(formData instanceof FormData)) return fail('Dados inválidos');

  const file = formData.get('file');

  if (!(file instanceof File)) return fail('Arquivo inválido');

  const maxUploadBytes =
    Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) ||
    DEFAULT_MAX_UPLOAD_BYTES;

  if (file.size > maxUploadBytes) return fail('Arquivo muito grande');
  if (!file.type.startsWith('image/')) return fail('Imagem inválida');

  const fileName = `${Date.now()}${extname(file.name)}`;
  const uploadDir = resolve(
    process.cwd(),
    'public',
    process.env.IMAGE_UPLOAD_DIRECTORY || 'uploads',
  );

  await mkdir(uploadDir, { recursive: true });
  await writeFile(
    resolve(uploadDir, fileName),
    Buffer.from(await file.arrayBuffer()),
  );

  const serverUrl =
    process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads';

  return ok(`${serverUrl}/${fileName}`);
}
