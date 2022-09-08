import { format } from 'date-fns';
import localeEs from 'date-fns/locale/es';

export function formatDate(date: Date, dateFormat: string = 'P'): string {
  try {
    return format(date, dateFormat, { locale: localeEs });
  } catch (error) {
    console.warn(error);
    return '';
  }
}

export function formatDate2(date: Date, dateFormat: string = 'PPP'): string {
  try {
    return format(date, dateFormat, { locale: localeEs });
  } catch (error) {
    console.warn(error);
    return '';
  }
}