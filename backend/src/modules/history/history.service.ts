import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreditHistoryDto } from './dto/history.dto';

@Injectable()
export class HistoryService {
  // TODO: replace with repository access (TypeORM/Prisma) returning the DTO shape the Angular app expects.
  async find(): Promise<CreditHistoryDto> {
    throw new NotImplementedException('credit-history is not implemented yet');
  }
}
