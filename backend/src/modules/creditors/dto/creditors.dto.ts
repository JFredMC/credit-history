export class CreditorDto {
  id: string;
  name: string;
  sector: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  totalBalance: number;
  monthlyPayment: number;
  overdueAmount: number;
  status: 'CURRENT' | 'LATE' | 'CLOSED' | 'DELINQUENT';
  since: string;
  observations: string;
}
