/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InfoTurmasComponent } from './info-turmas.component';

describe('InfoTurmasComponent', () => {
  let component: InfoTurmasComponent;
  let fixture: ComponentFixture<InfoTurmasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTurmasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
