import { Controller, Get } from '@nestjs/common';
import { CreditSummaryDto } from './dto/credit.dto';
import { CreditService } from './credit.service';

@Controller('credit-summary')
export class CreditController {
  constructor(private readonly service: CreditService) {}

  @Get()
  find(): Promise<CreditSummaryDto> {
    return this.service.find();
  }
}
