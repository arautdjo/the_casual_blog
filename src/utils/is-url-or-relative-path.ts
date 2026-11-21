export const isRelativePathRegex =
  /^\/(?:[A-Za-z0-9-._~!$&'()*+,;=:@]|%[0-9a-fA-F]{2})*(?:\/(?:[A-Za-z0-9-._~!$&'()*+,;=:@]|%[0-9a-fA-F]{2})*)*$/;

// [REFATORADO] `URL.canParse` responde true/false sem precisar de
// try/catch só para controlar o fluxo.
export const isUrlOrRelativePath = (value: string): boolean =>
  URL.canParse(value) || isRelativePathRegex.test(value);
