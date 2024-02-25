import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAliasComponent } from './set-alias.component';

describe('SetAliasComponent', () => {
  let component: SetAliasComponent;
  let fixture: ComponentFixture<SetAliasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetAliasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetAliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
