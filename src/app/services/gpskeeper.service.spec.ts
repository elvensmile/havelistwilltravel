import {inject, TestBed} from '@angular/core/testing';

import {GpskeeperService} from './gpskeeper.service';

describe('GpskeeperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GpskeeperService]
    });
  });

  it('should be created', inject([GpskeeperService], (service: GpskeeperService) => {
    expect(service).toBeTruthy();
  }));
});
