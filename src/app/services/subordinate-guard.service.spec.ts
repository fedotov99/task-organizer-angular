import { TestBed } from '@angular/core/testing';

import { SubordinateGuardService } from './subordinate-guard.service';

describe('SubordinateGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubordinateGuardService = TestBed.get(SubordinateGuardService);
    expect(service).toBeTruthy();
  });
});
