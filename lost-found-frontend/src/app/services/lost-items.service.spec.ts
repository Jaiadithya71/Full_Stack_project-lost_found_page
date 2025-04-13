import { TestBed } from '@angular/core/testing';

import { LostItemsService } from './lost-items.service';

describe('LostItemsService', () => {
  let service: LostItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LostItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
