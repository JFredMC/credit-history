import { Controller, Get } from '@nestjs/common';
import { CreditAlertDto } from './dto/alerts.dto';
import { AlertsService } from './alerts.service';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly service: AlertsService) {}

  @Get()
  find(): Promise<CreditAlertDto[]> {
    return this.service.find();
  }
}
