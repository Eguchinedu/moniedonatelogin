import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUsersComponent } from './user-users.component';

describe('UserUsersComponent', () => {
  let component: UserUsersComponent;
  let fixture: ComponentFixture<UserUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
