import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert-service.service';

describe(AlertService.name, () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('Deve criar o service (AlertService)', () => {
    expect(service).toBeTruthy();
  });
});
