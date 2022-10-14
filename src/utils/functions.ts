import { format } from 'date-fns';
import localeEs from 'date-fns/locale/es';

/**
 * This function returns the following format:
 * e: 29/09/2022
 */
export function formatDate(date: Date, dateFormat: string = 'P'): string {
  try {
    return format(date, dateFormat, { locale: localeEs });
  } catch (error) {
    console.warn(error);
    return '';
  }
}

/**
 * This function returns the following format:
 * e: 29 Setiembre 2022
 */
export function formatDate2(date: Date, dateFormat: string = 'PPP'): string {
  try {
    return format(date, dateFormat, { locale: localeEs });
  } catch (error) {
    console.warn(error);
    return '';
  }
}
