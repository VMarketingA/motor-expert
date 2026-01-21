/**
 * Security utilities for sanitizing user data and preventing XSS attacks
 */

/**
 * Escapes HTML special characters to prevent XSS attacks
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Recursively sanitizes an object for safe use in JSON-LD
 * Escapes all string values to prevent XSS attacks
 */
export function sanitizeForJsonLd(obj: any): any {
  if (typeof obj === 'string') {
    return escapeHtml(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeForJsonLd(item));
  }

  if (obj && typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeForJsonLd(obj[key]);
      }
    }
    return sanitized;
  }

  return obj;
}

/**
 * Creates a safe JSON-LD script tag with sanitized data
 */
export function createSafeJsonLd(data: any): string {
  const sanitized = sanitizeForJsonLd(data);
  return JSON.stringify(sanitized);
}
