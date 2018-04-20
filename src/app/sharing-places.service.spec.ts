import { TestBed, inject } from '@angular/core/testing';

import { SharingPlacesService } from './sharing-places.service';

describe('SharingPlacesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharingPlacesService]
    });
  });

  it('should be created', inject([SharingPlacesService], (service: SharingPlacesService) => {
    expect(service).toBeTruthy();
  }));
});
