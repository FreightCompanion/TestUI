import { Opportunity, StageDefinition } from './types';

export const COLORS = {
  navy: '#1A2B49',
  focusBlue: '#3B82F6', // Tailwind blue-500
  slate: '#64748B',
  amber: '#F59E0B',
  green: '#10B981',
  white: '#FFFFFF',
  offWhite: '#F8FAFC'
};

export const STAGES: StageDefinition[] = [
  { id: 1, name: "Targeted", probability: 0.1, isFocus: false },
  { id: 2, name: "Qualify", probability: 0.2, isFocus: false },
  { id: 3, name: "Discovery", probability: 0.3, isFocus: true },
  { id: 4, name: "Diagnostic", probability: 0.4, isFocus: true },
  { id: 5, name: "Proposal", probability: 0.6, isFocus: true },
  { id: 6, name: "Negotiation", probability: 0.8, isFocus: true },
  { id: 7, name: "Verbal / Commit", probability: 0.9, isFocus: false },
  { id: 8, name: "Steady State", probability: 1.0, isFocus: false },
];

// --- DYNAMIC DATE HELPERS ---
const TODAY = new Date();
const YEAR = TODAY.getFullYear();
const MONTH = TODAY.getMonth(); // 0-indexed

// Helper to format YYYY-MM-DD
const fmt = (d: Date) => d.toISOString().split('T')[0];

// Get a date relative to today (e.g., -5 days, +30 days)
const relativeDate = (days: number) => {
  const d = new Date(TODAY);
  d.setDate(d.getDate() + days);
  return fmt(d);
};

// Get a specific date in the current year's month (ensuring data appears in current quarter filters)
const getMonthDate = (monthOffset: number, day: number) => {
  // target month = current month + offset
  const targetDate = new Date(YEAR, MONTH + monthOffset, day);
  return fmt(targetDate);
};

export const INITIAL_DATA: Opportunity[] = [
  // --- CURRENT QUARTER DEALS (Visible Immediately) ---
  {
    id: "FUZ-101",
    customer: "Global Tech Imports",
    segment: "Enterprise",
    modes: ["LTL", "Warehouse"],
    pipeline_stage: 4,
    stage_name: "Diagnostic",
    financials: { est_monthly_rev: 45000, est_margin_pct: 18, weighted_value: 18000 },
    status: { days_in_stage: 12, last_activity: relativeDate(-5), next_step: "Complete lane analysis for Midwest region" },
    health_signals: { is_stale: false, ops_approved: true },
    management_note: "Needs expedited engineering review.",
    close_date: getMonthDate(0, 28) // End of this month
  },
  {
    id: "FUZ-102",
    customer: "Midwest Manufacturing",
    segment: "Mid-Market",
    modes: ["TL"],
    pipeline_stage: 6,
    stage_name: "Negotiation",
    financials: { est_monthly_rev: 12000, est_margin_pct: 12, weighted_value: 9600 },
    status: { days_in_stage: 5, last_activity: relativeDate(-2), next_step: "Finalize fuel surcharge agreement" },
    health_signals: { is_stale: false, ops_approved: true },
    close_date: getMonthDate(0, 15) // Mid this month
  },
  {
    id: "FUZ-106",
    customer: "AutoParts Plus",
    segment: "SMB",
    modes: ["LTL"],
    pipeline_stage: 7,
    stage_name: "Verbal / Commit",
    financials: { est_monthly_rev: 8000, est_margin_pct: 22, weighted_value: 7200 },
    status: { days_in_stage: 3, last_activity: relativeDate(-1), next_step: "Contract signature" },
    health_signals: { is_stale: false, ops_approved: true },
    close_date: getMonthDate(0, 10) // Early this month
  },
  {
    id: "FUZ-107",
    customer: "GreenGrocer Chain",
    segment: "Enterprise",
    modes: ["TL"],
    pipeline_stage: 7,
    stage_name: "Verbal / Commit",
    financials: { est_monthly_rev: 120000, est_margin_pct: 10, weighted_value: 108000 },
    status: { days_in_stage: 2, last_activity: relativeDate(-3), next_step: "Legal review" },
    health_signals: { is_stale: false, ops_approved: true },
    close_date: getMonthDate(0, 25)
  },
  {
    id: "FUZ-120",
    customer: "Fashion FWD",
    segment: "Mid-Market",
    modes: ["Warehouse", "LTL"],
    pipeline_stage: 6,
    stage_name: "Negotiation",
    financials: { est_monthly_rev: 30000, est_margin_pct: 18, weighted_value: 27000 },
    status: { days_in_stage: 6, last_activity: relativeDate(-4), next_step: "MSA Revision" },
    health_signals: { is_stale: false, ops_approved: true },
    close_date: getMonthDate(1, 5) // Next month
  },

  // --- STALE / AT RISK (For visual highlighting) ---
  {
    id: "FUZ-103",
    customer: "Eco Foods",
    segment: "SMB",
    modes: ["LTL"],
    pipeline_stage: 3,
    stage_name: "Discovery",
    financials: { est_monthly_rev: 5000, est_margin_pct: 25, weighted_value: 1500 },
    status: { days_in_stage: 25, last_activity: relativeDate(-20), next_step: "Schedule demo" },
    health_signals: { is_stale: true, ops_approved: false },
    close_date: getMonthDate(2, 15) // 2 months out
  },
  {
    id: "FUZ-111",
    customer: "City Beverages",
    segment: "SMB",
    modes: ["LTL"],
    pipeline_stage: 4,
    stage_name: "Diagnostic",
    financials: { est_monthly_rev: 10000, est_margin_pct: 25, weighted_value: 4000 },
    status: { days_in_stage: 20, last_activity: relativeDate(-15), next_step: "Analyze shipping data" },
    health_signals: { is_stale: true, ops_approved: false },
    close_date: getMonthDate(1, 20)
  },

  // --- FUTURE PIPELINE ---
  {
    id: "FUZ-104",
    customer: "Titan Steel",
    segment: "Enterprise",
    modes: ["Intermodal", "TL"],
    pipeline_stage: 5,
    stage_name: "Proposal",
    financials: { est_monthly_rev: 85000, est_margin_pct: 15, weighted_value: 51000 },
    status: { days_in_stage: 18, last_activity: relativeDate(-8), next_step: "Present ROI deck" },
    health_signals: { is_stale: false, ops_approved: true },
    close_date: getMonthDate(1, 15)
  },
  {
    id: "FUZ-108",
    customer: "Mega Construction",
    segment: "Enterprise",
    modes: ["TL", "Intermodal"],
    pipeline_stage: 6,
    stage_name: "Negotiation",
    financials: { est_monthly_rev: 95000, est_margin_pct: 14, weighted_value: 76000 },
    status: { days_in_stage: 10, last_activity: relativeDate(-6), next_step: "Final pricing review" },
    health_signals: { is_stale: false, ops_approved: true },
    close_date: getMonthDate(0, 30)
  },
  {
    id: "FUZ-109",
    customer: "Northwest Timber",
    segment: "Mid-Market",
    modes: ["Intermodal"],
    pipeline_stage: 5,
    stage_name: "Proposal",
    financials: { est_monthly_rev: 45000, est_margin_pct: 16, weighted_value: 27000 },
    status: { days_in_stage: 7, last_activity: relativeDate(-9), next_step: "Capacity confirmation" },
    health_signals: { is_stale: false, ops_approved: true },
    close_date: getMonthDate(2, 10)
  },
  {
    id: "FUZ-110",
    customer: "TechSolutions Inc",
    segment: "Mid-Market",
    modes: ["LTL", "Intermodal"],
    pipeline_stage: 5,
    stage_name: "Proposal",
    financials: { est_monthly_rev: 35000, est_margin_pct: 20, weighted_value: 21000 },
    status: { days_in_stage: 14, last_activity: relativeDate(-12), next_step: "Review proposal with VP" },
    health_signals: { is_stale: false, ops_approved: true },
    close_date: getMonthDate(3, 20) // Next Quarter
  },
  {
    id: "FUZ-115",
    customer: "Solar Systems Co",
    segment: "Mid-Market",
    modes: ["LTL"],
    pipeline_stage: 3,
    stage_name: "Discovery",
    financials: { est_monthly_rev: 18000, est_margin_pct: 21, weighted_value: 5400 },
    status: { days_in_stage: 45, last_activity: relativeDate(-25), next_step: "Identify decision maker" },
    health_signals: { is_stale: true, ops_approved: false },
    close_date: getMonthDate(4, 1) // Next Quarter
  },
  {
    id: "FUZ-118",
    customer: "Global Electronics",
    segment: "Enterprise",
    modes: ["Warehouse", "LTL"],
    pipeline_stage: 2,
    stage_name: "Qualify",
    financials: { est_monthly_rev: 200000, est_margin_pct: 12, weighted_value: 40000 },
    status: { days_in_stage: 15, last_activity: relativeDate(-14), next_step: "RFP response" },
    health_signals: { is_stale: false, ops_approved: true },
    close_date: getMonthDate(6, 15) // 2 Quarters out
  },
  {
    id: "FUZ-121",
    customer: "Red River Paper",
    segment: "Enterprise",
    modes: ["TL", "LTL"],
    pipeline_stage: 8,
    stage_name: "Steady State",
    financials: { est_monthly_rev: 60000, est_margin_pct: 14, weighted_value: 60000 },
    status: { days_in_stage: 120, last_activity: relativeDate(-5), next_step: "QBR Scheduling" },
    health_signals: { is_stale: false, ops_approved: true },
    close_date: getMonthDate(-2, 15) // Closed previously
  }
];

export const MONTHLY_TARGET = 500000; // Target Revenue