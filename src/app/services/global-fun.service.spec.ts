import { TestBed } from '@angular/core/testing';

import { GlobalFunService } from './global-fun.service';

describe('GlobalFunService', () => {
  let service: GlobalFunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalFunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
