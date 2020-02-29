import { TestBed } from '@angular/core/testing';

import { SpotsService } from './spots.service';

describe('SpotsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotsService = TestBed.get(SpotsService);
    expect(service).toBeTruthy();
  });
});
