import { Controller, Get } from '@nestjs/common';
import { CreditHistoryDto } from './dto/history.dto';
import { HistoryService } from './history.service';

@Controller('credit-history')
export class HistoryController {
  constructor(private readonly service: HistoryService) {}

  @Get()
  find(): Promise<CreditHistoryDto> {
    return this.service.find();
  }
}
