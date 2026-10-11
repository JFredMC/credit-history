import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreditAlert, CreditHistory, CreditSummary, Creditor, ScorePoint,
} from '../models/credit.models';
import { CreditApi } from './credit-api';

export const API_BASE_URL = 'http://localhost:3000';

/** NestJS-backed implementation. Not used by the demo; see docs/BACKEND_INTEGRATION.md. */
@Injectable()
export class HttpCreditApi implements CreditApi {
  private readonly http = inject(HttpClient);

  getSummary(): Observable<CreditSummary> { return this.http.get<CreditSummary>(`${API_BASE_URL}/credit-summary`); }
  getHistory(): Observable<CreditHistory> { return this.http.get<CreditHistory>(`${API_BASE_URL}/credit-history`); }
  getScoreTrend(): Observable<ScorePoint[]> { return this.http.get<ScorePoint[]>(`${API_BASE_URL}/score-trend`); }
  getCreditors(): Observable<Creditor[]> { return this.http.get<Creditor[]>(`${API_BASE_URL}/creditors`); }
  getAlerts(): Observable<CreditAlert[]> { return this.http.get<CreditAlert[]>(`${API_BASE_URL}/alerts`); }
}
