import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShamirComponent } from './shamir.component';

describe('ShamirComponent', () => {
  let component: ShamirComponent;
  let fixture: ComponentFixture<ShamirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShamirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShamirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
