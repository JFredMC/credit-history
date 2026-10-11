import { Module } from '@nestjs/common';
import { AlertsModule } from './modules/alerts/alerts.module';
import { CreditModule } from './modules/credit/credit.module';
import { CreditorsModule } from './modules/creditors/creditors.module';
import { HistoryModule } from './modules/history/history.module';
import { ScoreModule } from './modules/score/score.module';
import { UsersModule } from './modules/users/users.module';

@Module({ imports: [UsersModule, CreditModule, CreditorsModule, ScoreModule, HistoryModule, AlertsModule] })
export class AppModule {}
