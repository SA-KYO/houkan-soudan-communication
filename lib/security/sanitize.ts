const dangerous = /<script|<iframe|<object|<embed|on\w+=|javascript:/gi;

export function sanitizeText(input: string) {
  return input.replace(dangerous, '').trim();
}
