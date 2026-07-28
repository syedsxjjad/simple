import { type ClassValue, clsx } from 'clsx';
import { format, isValid, parseISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirst(str = "") {
  const cleanStr = str.replace(/_/g, ' ');
  return cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1).toLowerCase();
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

const DEFAULT_DATE_PATTERN = 'MMM dd, yyyy';

export function formatISODate(iso?: string | null, pattern: string = DEFAULT_DATE_PATTERN, fallback = '-'): string {
  if (!iso) return fallback;
  const parsed = parseISO(iso);
  return isValid(parsed) ? format(parsed, pattern) : fallback;
}

export const formatValue = (value: string) =>
  value
    .toLowerCase()
    .split(/[_\s]+/)
    .map(part => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(' ');


export const sanitizePositiveNumber = (value: string) => {
  const onlyDigits = value.replace(/\D/g, '');
  return onlyDigits.replace(/^0+/, '');
};

/** Race number: digits with optional X/S prefix (S332) or suffix (5X). */
export const sanitizeRaceNumber = (value: string) => {
  const upper = value.toUpperCase();
  let out = '';

  for (const ch of upper) {
    if (/[0-9]/.test(ch)) {
      // Block digits only after a trailing suffix (e.g. 5X), not after a prefix (e.g. S).
      if (/^[1-9]\d*[XS]$/.test(out)) continue;

      const digitCount = (out.match(/\d/g) ?? []).length;
      if (digitCount >= 8) continue;

      if (out.length === 0) {
        if (ch !== '0') out += ch;
        continue;
      }

      if (/^[XS]$/.test(out) && ch === '0') continue;

      out += ch;
    } else if (ch === 'X' || ch === 'S') {
      if (out.length === 0) {
        out += ch;
      } else if (/^[1-9]\d*$/.test(out)) {
        out += ch;
      }
    }
  }

  if (/^[XS]/.test(out)) {
    const prefix = out[0];
    const digits = out.slice(1).replace(/^0+/, '');
    return digits ? `${prefix}${digits}` : prefix;
  }

  return out.replace(/^0+/, '');
};

export const withAvatarCacheBust = (avatarUrl: string): string => {
  if (!avatarUrl) return '';
  const sep = avatarUrl.includes('?') ? '&' : '?';
  return `${avatarUrl}${sep}v=${Date.now()}`;
};

export const roundToTwo = (value: number) => Number(value.toFixed(2));

export const formatPercentage = (value: number) =>
  Number.isInteger(value) ? String(value) : value.toFixed(2);

export const sanitizePercentageInput = (value: string) => {
  let next = value.replace(/[^\d.]/g, '');
  const firstDotIndex = next.indexOf('.');
  if (firstDotIndex !== -1) {
    next = `${next.slice(0, firstDotIndex + 1)}${next.slice(firstDotIndex + 1).replace(/\./g, '')}`;
  }
  if (next.startsWith('.')) {
    next = `0${next}`;
  }
  if (next.includes('.')) {
    const [whole, decimal = ''] = next.split('.');
    next = `${whole}.${decimal.slice(0, 2)}`;
  }

  if (next === '') return '';

  const numeric = Number.parseFloat(next);
  if (!Number.isNaN(numeric) && numeric > 100) {
    return '100';
  }
  return next;
};