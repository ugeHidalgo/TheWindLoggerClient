import { TestBed } from '@angular/core/testing';

import { SessionMaterialsService } from './session-materials.service';

describe('SessionMaterialsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionMaterialsService = TestBed.get(SessionMaterialsService);
    expect(service).toBeTruthy();
  });
});
