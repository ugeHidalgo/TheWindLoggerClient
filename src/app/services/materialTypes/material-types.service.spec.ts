import { TestBed } from '@angular/core/testing';

import { MaterialTypesService } from './material-types.service';

describe('MaterialTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialTypesService = TestBed.get(MaterialTypesService);
    expect(service).toBeTruthy();
  });
});
