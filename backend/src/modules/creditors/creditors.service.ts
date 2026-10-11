import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreditorDto } from './dto/creditors.dto';

@Injectable()
export class CreditorsService {
  // TODO: replace with repository access (TypeORM/Prisma) returning the DTO shape the Angular app expects.
  async find(): Promise<CreditorDto[]> {
    throw new NotImplementedException('creditors is not implemented yet');
  }
}
