import { TestBed } from '@angular/core/testing';

import { SankbarService } from './sankbar.service';

describe('SankbarService', () => {
  let service: SankbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SankbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
