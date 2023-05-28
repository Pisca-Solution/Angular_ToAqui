import { LoggedGuard } from './logged.guard';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoggedGuard', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
  );

  it('Deve criar o guard (LoggedGuard)', () => {
    const service: LoggedGuard = TestBed.get(LoggedGuard);
    expect(service).toBeTruthy();
  });
});
