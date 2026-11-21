/**
 * Extrai uma mensagem legível de qualquer valor capturado em um `catch`.
 * Antes, esse `if (e instanceof Error)` estava copiado em 3 actions.
 */
export function getErrorMessage(error: unknown, fallback = 'Erro desconhecido') {
  return error instanceof Error ? error.message : fallback;
}
