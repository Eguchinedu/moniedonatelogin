import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswrdResetComponent } from './passwrd-reset.component';

describe('PasswrdResetComponent', () => {
  let component: PasswrdResetComponent;
  let fixture: ComponentFixture<PasswrdResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswrdResetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswrdResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
