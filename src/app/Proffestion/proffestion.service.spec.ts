import { TestBed } from '@angular/core/testing';

import { ProffestionService } from './proffestion.service';

describe('ProffestionService', () => {
  let service: ProffestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProffestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
