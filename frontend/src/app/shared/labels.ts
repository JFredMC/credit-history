import { CreditStatus, CreditType, PaymentBehavior, RiskLevel, AlertSeverity, EventType } from '../core/models/credit.models';

export const TYPE_LABEL: Record<CreditType, string> = {
  CREDIT_CARD: 'Credit card', PERSONAL_LOAN: 'Personal loan', MORTGAGE: 'Mortgage',
  VEHICLE: 'Vehicle', EDUCATION: 'Education', TELCO: 'Telecom',
};
export const STATUS_LABEL: Record<CreditStatus, string> = {
  CURRENT: 'Current', LATE: 'Late', CLOSED: 'Closed', DELINQUENT: 'Delinquent',
};
export const STATUS_CLASS: Record<CreditStatus, string> = {
  CURRENT: 'bg-emerald-100 text-emerald-700', LATE: 'bg-amber-100 text-amber-700',
  CLOSED: 'bg-slate-100 text-slate-600', DELINQUENT: 'bg-rose-100 text-rose-700',
};
export const RISK_LABEL: Record<RiskLevel, string> = { LOW: 'Low', MEDIUM: 'Medium', HIGH: 'High' };
export const RISK_CLASS: Record<RiskLevel, string> = {
  LOW: 'bg-emerald-100 text-emerald-700', MEDIUM: 'bg-amber-100 text-amber-700', HIGH: 'bg-rose-100 text-rose-700',
};
export const BEHAVIOR_LABEL: Record<PaymentBehavior, string> = {
  ON_TIME: 'On time', LATE_30: '30 days late', LATE_60: '60 days late', LATE_90: '90+ days late',
};
export const BEHAVIOR_COLOR: Record<PaymentBehavior, string> = {
  ON_TIME: '#10b981', LATE_30: '#f59e0b', LATE_60: '#f97316', LATE_90: '#e11d48',
};
export const SEVERITY_CLASS: Record<AlertSeverity, string> = {
  INFO: 'border-sky-200 bg-sky-50 text-sky-800',
  WARNING: 'border-amber-200 bg-amber-50 text-amber-800',
  CRITICAL: 'border-rose-200 bg-rose-50 text-rose-800',
};
export const EVENT_STYLE: Record<EventType, { icon: string; cls: string }> = {
  PAYMENT: { icon: '$', cls: 'bg-emerald-500' },
  INSTALLMENT: { icon: '✓', cls: 'bg-emerald-500' },
  LATE: { icon: '!', cls: 'bg-amber-500' },
  CLOSURE: { icon: '■', cls: 'bg-slate-500' },
  REPORT: { icon: '◆', cls: 'bg-indigo-500' },
  INQUIRY: { icon: '?', cls: 'bg-sky-500' },
};
export const CHART_COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#e11d48', '#8b5cf6'];
