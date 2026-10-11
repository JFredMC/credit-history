import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { CREDIT_API } from './core/services/credit-api';
import { MockCreditApi } from './core/services/mock-credit-api';
import { productsToCsv } from './features/report/export';
import { MOCK_PRODUCTS } from './core/data/mock-data';

describe('App', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [App],
    providers: [provideRouter([]), { provide: CREDIT_API, useClass: MockCreditApi }],
  }));

  it('renders the shell navigation', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Credit history');
  });
});

describe('MockCreditApi', () => {
  it('returns the score trend of 12 months', async () => {
    const api = new MockCreditApi();
    const trend = await new Promise<number>((r) => api.getScoreTrend().subscribe((t) => r(t.length)));
    expect(trend).toBe(12);
  });
});

describe('productsToCsv', () => {
  it('outputs a header plus one row per product', () => {
    expect(productsToCsv(MOCK_PRODUCTS, new Map()).split('\n')).toHaveLength(MOCK_PRODUCTS.length + 1);
  });
});
