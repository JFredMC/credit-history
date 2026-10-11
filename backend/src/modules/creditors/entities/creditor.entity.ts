export class Creditor {
  id: string;
  name: string;
  sector: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  since: Date;
  observations: string;
}
