import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreditSummaryDto } from './dto/credit.dto';

@Injectable()
export class CreditService {
  // TODO: replace with repository access (TypeORM/Prisma) returning the DTO shape the Angular app expects.
  async find(): Promise<CreditSummaryDto> {
    throw new NotImplementedException('credit-summary is not implemented yet');
  }
}
