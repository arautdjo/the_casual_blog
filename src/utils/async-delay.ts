import { setTimeout as sleep } from 'node:timers/promises';
import { logColor } from './log-color';

// [REFATORADO] Usa a API nativa `timers/promises` em vez de montar a Promise
// na mão com `new Promise(resolve => setTimeout(resolve, ms))`.
export async function asyncDelay(milliseconds = 0, verbose = false) {
  if (milliseconds <= 0) return;

  if (verbose) logColor(`Delaying for ${milliseconds / 1000}s`);

  await sleep(milliseconds);
}
