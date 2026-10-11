import { UserDto } from '../../users/dto/user.dto';

export class CreditSummaryDto {
  user: UserDto;
  score: number;
  scoreMin: number;
  scoreMax: number;
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
  typeBreakdown: { type: string; amount: number; count: number }[];
  paymentBreakdown: { behavior: string; count: number }[];
}
