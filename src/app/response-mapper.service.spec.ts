import { TestBed } from '@angular/core/testing';

import { ResponseMapperService } from './response-mapper.service';

describe('ResponseMapperService', () => {
  let service: ResponseMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
