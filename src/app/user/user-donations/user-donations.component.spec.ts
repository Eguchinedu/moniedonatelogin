import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDonationsComponent } from './user-donations.component';

describe('UserDonationsComponent', () => {
  let component: UserDonationsComponent;
  let fixture: ComponentFixture<UserDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDonationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
