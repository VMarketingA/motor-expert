export function formatBlogContent(content: string): string {
  return content
    .replace(/^#+\s+/gm, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/^>\s+/gm, '')
    .replace(/^-\s+/gm, '• ')
    .replace(/^\d+\.\s+/gm, (match) => match)
    .trim();
}
