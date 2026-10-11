import { CreditProduct } from '../../core/models/credit.models';

const csvCell = (v: string | number): string => {
  let s = String(v);
  if (/^[=+\-@]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export function productsToCsv(products: CreditProduct[], creditorNames: Map<string, string>): string {
  const header = ['Creditor', 'Product', 'Type', 'Status', 'Original amount', 'Balance', 'Monthly payment', 'Overdue', 'Days late', 'Opened'];
  const rows = products.map((p) => [
    creditorNames.get(p.creditorId) ?? p.creditorId, p.name, p.type, p.status,
    p.originalAmount, p.balance, p.monthlyPayment, p.overdueAmount, p.daysLate, p.openedAt,
  ]);
  return [header, ...rows].map((r) => r.map(csvCell).join(',')).join('\n');
}

export function downloadFile(filename: string, content: string, mime: string): void {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
