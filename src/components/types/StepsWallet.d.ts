export interface EvaluateServiceInterface {
  ticket?: string;
  station?: string;
  folio?: string;
  webid?: string;
  date?: string;
  establishment_id?: number;
  suggestions?: string[];
  score?: number;
  user_id?: string;
  comment?: string;
  score_app?: number;
}

export type EstablishmentType = '7Eleven' | 'petro7';

export interface TicketValidInterfece {
  establishment_id: number;
  ticket?: string;
  station?: string;
  folio?: string;
  webid?: string;
  date?: string;
}

export interface SuggestionInterface {
  suggestions_cat_id: number;
  description: string;
}
