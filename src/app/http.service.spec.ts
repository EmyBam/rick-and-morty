import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';

// @ts-ignore
describe('HttpService', () => {
  let service: HttpService;

  // @ts-ignore
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpService);
  });

  // @ts-ignore
  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
