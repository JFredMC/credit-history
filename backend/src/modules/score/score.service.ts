import { Injectable, NotImplementedException } from '@nestjs/common';
import { ScorePointDto } from './dto/score.dto';

@Injectable()
export class ScoreService {
  // TODO: replace with repository access (TypeORM/Prisma) returning the DTO shape the Angular app expects.
  async find(): Promise<ScorePointDto[]> {
    throw new NotImplementedException('score-trend is not implemented yet');
  }
}
