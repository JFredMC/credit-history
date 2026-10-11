import {
  CreditAlert, CreditEvent, CreditHistory, CreditProduct, CreditSummary, Creditor, ScorePoint,
} from '../models/credit.models';

const P = 'ON_TIME' as const;
const L30 = 'LATE_30' as const;
const L60 = 'LATE_60' as const;

export const MOCK_CREDITORS: Creditor[] = [
  { id: 'c1', name: 'Banco Andino', sector: 'Financial', risk: 'LOW', totalBalance: 18_400_000, monthlyPayment: 1_150_000, overdueAmount: 0, status: 'CURRENT', since: '2019-03-12', observations: 'Excellent payment record across all products.' },
  { id: 'c2', name: 'Bancolombia Demo', sector: 'Financial', risk: 'MEDIUM', totalBalance: 92_000_000, monthlyPayment: 1_480_000, overdueAmount: 0, status: 'CURRENT', since: '2020-08-01', observations: 'Mortgage in good standing, 14 years remaining.' },
  { id: 'c3', name: 'Nubia Fintech', sector: 'Fintech', risk: 'MEDIUM', totalBalance: 4_900_000, monthlyPayment: 420_000, overdueAmount: 420_000, status: 'LATE', since: '2023-02-20', observations: 'One installment 34 days late. Contact the entity to regularize.' },
  { id: 'c4', name: 'Cooperativa Sol', sector: 'Cooperative', risk: 'LOW', totalBalance: 0, monthlyPayment: 0, overdueAmount: 0, status: 'CLOSED', since: '2018-05-10', observations: 'Loan fully paid in 2024. Positive reference.' },
  { id: 'c5', name: 'AutoFin Colombia', sector: 'Financial', risk: 'MEDIUM', totalBalance: 31_500_000, monthlyPayment: 1_090_000, overdueAmount: 0, status: 'CURRENT', since: '2022-06-15', observations: 'Vehicle loan with one past delay, now regularized.' },
  { id: 'c6', name: 'Telecom Plus', sector: 'Telecom', risk: 'HIGH', totalBalance: 1_250_000, monthlyPayment: 0, overdueAmount: 1_250_000, status: 'DELINQUENT', since: '2024-01-09', observations: 'Overdue handset financing, 95 days in arrears. Reported as delinquent.' },
];

export const MOCK_PRODUCTS: CreditProduct[] = [
  { id: 'p1', creditorId: 'c1', type: 'CREDIT_CARD', name: 'Visa Platinum', originalAmount: 15_000_000, balance: 6_400_000, monthlyPayment: 450_000, overdueAmount: 0, daysLate: 0, status: 'CURRENT', openedAt: '2019-03-12', lastReportedAt: '2026-09-30', paymentHistory: [P, P, P, P, P, P, P, P, P, P, P, P] },
  { id: 'p2', creditorId: 'c1', type: 'PERSONAL_LOAN', name: 'Libre inversión', originalAmount: 20_000_000, balance: 12_000_000, monthlyPayment: 700_000, overdueAmount: 0, daysLate: 0, status: 'CURRENT', openedAt: '2024-04-02', lastReportedAt: '2026-09-30', paymentHistory: [P, P, P, P, P, P, P, P, P, P, P, P] },
  { id: 'p3', creditorId: 'c2', type: 'MORTGAGE', name: 'Housing loan', originalAmount: 120_000_000, balance: 92_000_000, monthlyPayment: 1_480_000, overdueAmount: 0, daysLate: 0, status: 'CURRENT', openedAt: '2020-08-01', lastReportedAt: '2026-09-28', paymentHistory: [P, P, P, P, P, P, P, P, P, P, P, P] },
  { id: 'p4', creditorId: 'c3', type: 'CREDIT_CARD', name: 'Nubia Card', originalAmount: 6_000_000, balance: 4_900_000, monthlyPayment: 420_000, overdueAmount: 420_000, daysLate: 34, status: 'LATE', openedAt: '2023-02-20', lastReportedAt: '2026-10-05', paymentHistory: [P, P, P, L30, P, P, P, P, P, P, P, L30] },
  { id: 'p5', creditorId: 'c4', type: 'PERSONAL_LOAN', name: 'Crédito de libranza', originalAmount: 8_000_000, balance: 0, monthlyPayment: 0, overdueAmount: 0, daysLate: 0, status: 'CLOSED', openedAt: '2021-05-10', closedAt: '2024-11-20', lastReportedAt: '2024-11-20', paymentHistory: [P, P, P, P, P, P, P, P, P, P, P, P] },
  { id: 'p6', creditorId: 'c5', type: 'VEHICLE', name: 'Vehicle loan', originalAmount: 45_000_000, balance: 31_500_000, monthlyPayment: 1_090_000, overdueAmount: 0, daysLate: 0, status: 'CURRENT', openedAt: '2022-06-15', lastReportedAt: '2026-09-29', paymentHistory: [L60, L30, P, P, P, P, P, P, P, P, P, P] },
  { id: 'p7', creditorId: 'c6', type: 'TELCO', name: 'Handset financing', originalAmount: 3_000_000, balance: 1_250_000, monthlyPayment: 0, overdueAmount: 1_250_000, daysLate: 95, status: 'DELINQUENT', openedAt: '2024-01-09', lastReportedAt: '2026-10-02', paymentHistory: [P, P, P, P, P, P, L30, L30, L60, L60, L60, L60] },
  { id: 'p8', creditorId: 'c2', type: 'EDUCATION', name: 'Student loan', originalAmount: 5_000_000, balance: 0, monthlyPayment: 0, overdueAmount: 0, daysLate: 0, status: 'CLOSED', openedAt: '2019-01-15', closedAt: '2025-06-30', lastReportedAt: '2025-06-30', paymentHistory: [P, P, P, P, P, P, P, P, P, P, P, P] },
];

export const MOCK_EVENTS: CreditEvent[] = [
  { id: 'e1', date: '2026-10-05', type: 'LATE', title: 'Late installment', description: 'Nubia Card installment is 34 days overdue.', creditorId: 'c3', amount: 420_000 },
  { id: 'e2', date: '2026-10-02', type: 'REPORT', title: 'Delinquency reported', description: 'Telecom Plus reported handset financing at 95 days past due.', creditorId: 'c6', amount: 1_250_000 },
  { id: 'e3', date: '2026-09-30', type: 'PAYMENT', title: 'Payment received', description: 'Visa Platinum minimum payment.', creditorId: 'c1', amount: 450_000 },
  { id: 'e4', date: '2026-09-28', type: 'INSTALLMENT', title: 'Mortgage installment paid', description: 'Housing loan installment applied.', creditorId: 'c2', amount: 1_480_000 },
  { id: 'e5', date: '2026-09-15', type: 'INQUIRY', title: 'Credit inquiry', description: 'Banco Andino consulted your report.', creditorId: 'c1' },
  { id: 'e6', date: '2026-08-29', type: 'INSTALLMENT', title: 'Vehicle installment paid', description: 'AutoFin Colombia installment applied.', creditorId: 'c5', amount: 1_090_000 },
  { id: 'e7', date: '2026-06-30', type: 'CLOSURE', title: 'Loan closed', description: 'Student loan fully paid.', creditorId: 'c2' },
  { id: 'e8', date: '2026-03-10', type: 'LATE', title: 'Late installment', description: 'Nubia Card installment paid 30 days late.', creditorId: 'c3', amount: 420_000 },
  { id: 'e9', date: '2025-11-20', type: 'CLOSURE', title: 'Loan closed', description: 'Crédito de libranza fully paid.', creditorId: 'c4' },
  { id: 'e10', date: '2025-04-02', type: 'REPORT', title: 'New product reported', description: 'Banco Andino reported a new personal loan.', creditorId: 'c1', amount: 20_000_000 },
];

export const MOCK_SCORE_TREND: ScorePoint[] = [
  { month: '2025-11', score: 742 }, { month: '2025-12', score: 748 }, { month: '2026-01', score: 751 },
  { month: '2026-02', score: 755 }, { month: '2026-03', score: 731 }, { month: '2026-04', score: 736 },
  { month: '2026-05', score: 742 }, { month: '2026-06', score: 749 }, { month: '2026-07', score: 745 },
  { month: '2026-08', score: 738 }, { month: '2026-09', score: 724 }, { month: '2026-10', score: 702 },
];

export const MOCK_ALERTS: CreditAlert[] = [
  { id: 'a1', severity: 'CRITICAL', title: 'Delinquent account', message: 'Telecom Plus reports 95 days past due ($1,250,000 COP). This heavily impacts your score.', date: '2026-10-02', creditorId: 'c6', read: false },
  { id: 'a2', severity: 'WARNING', title: 'Installment overdue', message: 'Nubia Fintech installment overdue by 34 days. Pay soon to avoid further reporting.', date: '2026-10-05', creditorId: 'c3', read: false },
  { id: 'a3', severity: 'WARNING', title: 'Score dropped', message: 'Your score fell 22 points in the last month.', date: '2026-10-01', read: false },
  { id: 'a4', severity: 'INFO', title: 'New inquiry', message: 'Banco Andino consulted your credit report.', date: '2026-09-15', creditorId: 'c1', read: true },
  { id: 'a5', severity: 'INFO', title: 'Loan closed', message: 'Your student loan was reported as paid in full.', date: '2026-06-30', creditorId: 'c2', read: true },
];

export const MOCK_SUMMARY: CreditSummary = {
  user: { id: 'u1', fullName: 'Camila Rodríguez Pérez', documentType: 'CC', documentNumber: '1.023.***.456', city: 'Bogotá', memberSince: '2018-02-01' },
  score: 702, scoreMin: 150, scoreMax: 950, scoreLabel: 'Good', scoreChange: -22,
  totalDebt: 148_050_000, monthlyInstallments: 3_960_000, overdueDebt: 1_670_000,
  onTimePaymentRate: 91, creditUtilization: 43, activeProducts: 6, closedProducts: 2, openAlerts: 3,
  lastUpdate: '2026-10-10',
  typeBreakdown: [
    { type: 'MORTGAGE', amount: 92_000_000, count: 1 },
    { type: 'VEHICLE', amount: 31_500_000, count: 1 },
    { type: 'PERSONAL_LOAN', amount: 12_000_000, count: 1 },
    { type: 'CREDIT_CARD', amount: 11_300_000, count: 2 },
    { type: 'TELCO', amount: 1_250_000, count: 1 },
  ],
  paymentBreakdown: [
    { behavior: 'ON_TIME', count: 88 }, { behavior: 'LATE_30', count: 5 },
    { behavior: 'LATE_60', count: 5 }, { behavior: 'LATE_90', count: 0 },
  ],
};

export const MOCK_HISTORY: CreditHistory = { products: MOCK_PRODUCTS, events: MOCK_EVENTS };
