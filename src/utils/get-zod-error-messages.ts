import { ZodError } from 'zod';

// [REFATORADO] Antes recebia `error.format()` (um objeto aninhado) e precisava
// de map + flat + filter para desembrulhar. `error.issues` já é uma lista
// plana: basta pegar a mensagem de cada item.
export function getZodErrorMessages(error: ZodError): string[] {
  return error.issues.map(issue => issue.message);
}
