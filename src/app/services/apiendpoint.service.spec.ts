import { TestBed } from '@angular/core/testing';

import { ApiendpointService } from './apiendpoint.service';

describe('ApiendpointService', () => {
  let service: ApiendpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiendpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
