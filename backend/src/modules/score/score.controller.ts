import { Controller, Get } from '@nestjs/common';
import { ScorePointDto } from './dto/score.dto';
import { ScoreService } from './score.service';

@Controller('score-trend')
export class ScoreController {
  constructor(private readonly service: ScoreService) {}

  @Get()
  find(): Promise<ScorePointDto[]> {
    return this.service.find();
  }
}
