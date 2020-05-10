import { TestBed } from '@angular/core/testing';

import { ResponseMapper } from './response-mapper.service';

// @ts-ignore
describe('ResponseMapperService', () => {
  let service: ResponseMapper;

  // @ts-ignore
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseMapper);
  });

  // @ts-ignore
  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
