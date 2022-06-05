export function fixRawChannelId(rawId: string): string {
  return rawId.slice(2, -1);
}
