export class CreditAlertDto {
  id: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  message: string;
  date: string;
  creditorId?: string;
  read: boolean;
}
