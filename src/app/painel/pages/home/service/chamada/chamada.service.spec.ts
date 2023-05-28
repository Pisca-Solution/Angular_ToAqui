/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChamadaService } from './chamada.service';

describe('Service: Chamada', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChamadaService]
    });
  });

  it('should ...', inject([ChamadaService], (service: ChamadaService) => {
    expect(service).toBeTruthy();
  }));
});
