import { Controller, Get } from '@nestjs/common';
import { CreditorDto } from './dto/creditors.dto';
import { CreditorsService } from './creditors.service';

@Controller('creditors')
export class CreditorsController {
  constructor(private readonly service: CreditorsService) {}

  @Get()
  find(): Promise<CreditorDto[]> {
    return this.service.find();
  }
}
