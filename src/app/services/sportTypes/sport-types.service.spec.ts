import { TestBed } from '@angular/core/testing';

import { SportTypesService } from './sport-types.service';

describe('SportTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SportTypesService = TestBed.get(SportTypesService);
    expect(service).toBeTruthy();
  });
});
