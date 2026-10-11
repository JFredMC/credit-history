export type CreditType = 'CREDIT_CARD' | 'PERSONAL_LOAN' | 'MORTGAGE' | 'VEHICLE' | 'EDUCATION' | 'TELCO';
export type CreditStatus = 'CURRENT' | 'LATE' | 'CLOSED' | 'DELINQUENT';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type PaymentBehavior = 'ON_TIME' | 'LATE_30' | 'LATE_60' | 'LATE_90';
export type AlertSeverity = 'INFO' | 'WARNING' | 'CRITICAL';
export type EventType = 'PAYMENT' | 'INSTALLMENT' | 'LATE' | 'CLOSURE' | 'REPORT' | 'INQUIRY';

export interface UserProfile {
  id: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  city: string;
  memberSince: string;
}

export interface CreditSummary {
  user: UserProfile;
  score: number;
  scoreMax: number;
  scoreMin: number;
  scoreLabel: string;
  scoreChange: number;
  totalDebt: number;
  monthlyInstallments: number;
  overdueDebt: number;
  onTimePaymentRate: number;
  creditUtilization: number;
  activeProducts: number;
  closedProducts: number;
  openAlerts: number;
  lastUpdate: string;
  typeBreakdown: { type: CreditType; amount: number; count: number }[];
  paymentBreakdown: { behavior: PaymentBehavior; count: number }[];
}

export interface CreditProduct {
  id: string;
  creditorId: string;
  type: CreditType;
  name: string;
  originalAmount: number;
  balance: number;
  monthlyPayment: number;
  overdueAmount: number;
  daysLate: number;
  status: CreditStatus;
  openedAt: string;
  closedAt?: string;
  lastReportedAt: string;
  paymentHistory: PaymentBehavior[];
}

export interface Creditor {
  id: string;
  name: string;
  sector: string;
  risk: RiskLevel;
  totalBalance: number;
  monthlyPayment: number;
  overdueAmount: number;
  status: CreditStatus;
  since: string;
  observations: string;
}

export interface CreditEvent {
  id: string;
  date: string;
  type: EventType;
  title: string;
  description: string;
  creditorId?: string;
  amount?: number;
}

export interface ScorePoint {
  month: string;
  score: number;
}

export interface CreditAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  date: string;
  creditorId?: string;
  read: boolean;
}

export interface CreditHistory {
  products: CreditProduct[];
  events: CreditEvent[];
}
