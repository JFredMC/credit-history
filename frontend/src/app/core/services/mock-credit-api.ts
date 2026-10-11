import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import {
  MOCK_ALERTS, MOCK_CREDITORS, MOCK_HISTORY, MOCK_SCORE_TREND, MOCK_SUMMARY,
} from '../data/mock-data';
import {
  CreditAlert, CreditHistory, CreditSummary, Creditor, ScorePoint,
} from '../models/credit.models';
import { CreditApi } from './credit-api';

const LATENCY_MS = 600;
const simulate = <T>(value: T): Observable<T> => of(structuredClone(value)).pipe(delay(LATENCY_MS));

@Injectable()
export class MockCreditApi implements CreditApi {
  getSummary(): Observable<CreditSummary> { return simulate(MOCK_SUMMARY); }
  getHistory(): Observable<CreditHistory> { return simulate(MOCK_HISTORY); }
  getScoreTrend(): Observable<ScorePoint[]> { return simulate(MOCK_SCORE_TREND); }
  getCreditors(): Observable<Creditor[]> { return simulate(MOCK_CREDITORS); }
  getAlerts(): Observable<CreditAlert[]> { return simulate(MOCK_ALERTS); }
}
