export class CreditEventDto {
  id: string;
  date: string;
  type: string;
  title: string;
  description: string;
  creditorId?: string;
  amount?: number;
}

export class CreditProductDto {
  id: string;
  creditorId: string;
  type: string;
  name: string;
  originalAmount: number;
  balance: number;
  monthlyPayment: number;
  overdueAmount: number;
  daysLate: number;
  status: string;
  openedAt: string;
  closedAt?: string;
  lastReportedAt: string;
  paymentHistory: ('ON_TIME' | 'LATE_30' | 'LATE_60' | 'LATE_90')[];
}

export class CreditHistoryDto {
  products: CreditProductDto[];
  events: CreditEventDto[];
}
