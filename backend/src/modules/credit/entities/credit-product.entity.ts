export class CreditProduct {
  id: string;
  userId: string;
  creditorId: string;
  type: 'CREDIT_CARD' | 'PERSONAL_LOAN' | 'MORTGAGE' | 'VEHICLE' | 'EDUCATION' | 'TELCO';
  name: string;
  originalAmount: number;
  balance: number;
  monthlyPayment: number;
  overdueAmount: number;
  daysLate: number;
  status: 'CURRENT' | 'LATE' | 'CLOSED' | 'DELINQUENT';
  openedAt: Date;
  closedAt?: Date;
  lastReportedAt: Date;
}
