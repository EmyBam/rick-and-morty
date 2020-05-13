import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

// @ts-ignore
describe('AuthGuard', () => {
  let guard: AuthGuard;

  // @ts-ignore
  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  // @ts-ignore
  it('should be created', () => {
    // @ts-ignore
    expect(guard).toBeTruthy();
  });
});
