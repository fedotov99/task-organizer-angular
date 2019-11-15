import { TestBed } from '@angular/core/testing';

import { SubordinateService } from './subordinate.service';

describe('SubordinateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubordinateService = TestBed.get(SubordinateService);
    expect(service).toBeTruthy();
  });
});
