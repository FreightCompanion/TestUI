export interface Financials {
  est_monthly_rev: number;
  est_margin_pct: number;
  weighted_value: number;
}

export interface Status {
  days_in_stage: number;
  last_activity: string; // ISO Date "YYYY-MM-DD"
  next_step: string;
}

export interface HealthSignals {
  is_stale: boolean;
  ops_approved: boolean;
}

export interface Opportunity {
  id: string;
  customer: string;
  segment: 'SMB' | 'Mid-Market' | 'Enterprise';
  modes: string[]; // "LTL", "TL", "Intermodal", "Warehouse"
  pipeline_stage: number;
  stage_name: string;
  financials: Financials;
  status: Status;
  health_signals: HealthSignals;
  management_note?: string; // Added based on requirements
  close_date: string; // ISO Date "YYYY-MM-DD" target close
}

export interface StageDefinition {
  id: number;
  name: string;
  probability: number;
  isFocus: boolean;
}

export const MODES = ["LTL", "TL", "Intermodal", "Warehouse"];
export const SEGMENTS = ["SMB", "Mid-Market", "Enterprise"];