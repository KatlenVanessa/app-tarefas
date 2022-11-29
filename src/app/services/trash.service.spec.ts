import { TestBed } from '@angular/core/testing';

import { TrashService } from './trash.service';

describe('TrashService', () => {
  let service: TrashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
