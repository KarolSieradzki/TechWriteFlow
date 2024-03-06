import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserImageControlComponent } from './user-image-control.component';

describe('UserImageControlComponent', () => {
  let component: UserImageControlComponent;
  let fixture: ComponentFixture<UserImageControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserImageControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserImageControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
