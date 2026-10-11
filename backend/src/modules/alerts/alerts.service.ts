import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreditAlertDto } from './dto/alerts.dto';

@Injectable()
export class AlertsService {
  // TODO: replace with repository access (TypeORM/Prisma) returning the DTO shape the Angular app expects.
  async find(): Promise<CreditAlertDto[]> {
    throw new NotImplementedException('alerts is not implemented yet');
  }
}
