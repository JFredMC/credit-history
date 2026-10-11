export class CreditEvent {
  id: string;
  userId: string;
  creditorId?: string;
  date: Date;
  type: 'PAYMENT' | 'INSTALLMENT' | 'LATE' | 'CLOSURE' | 'REPORT' | 'INQUIRY';
  title: string;
  description: string;
  amount?: number;
}
