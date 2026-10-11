import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreditAlert, CreditHistory, CreditSummary, Creditor, ScorePoint,
} from '../models/credit.models';

/**
 * Contract between the UI and its data source. The demo binds it to
 * MockCreditApi; switch to HttpCreditApi (NestJS) in app.config.ts.
 */
export interface CreditApi {
  getSummary(): Observable<CreditSummary>;
  getHistory(): Observable<CreditHistory>;
  getScoreTrend(): Observable<ScorePoint[]>;
  getCreditors(): Observable<Creditor[]>;
  getAlerts(): Observable<CreditAlert[]>;
}

export const CREDIT_API = new InjectionToken<CreditApi>('CREDIT_API');
