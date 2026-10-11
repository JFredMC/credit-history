export class Alert {
  id: string;
  userId: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  message: string;
  date: Date;
  creditorId?: string;
  read: boolean;
}
