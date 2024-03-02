import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioNotFoundComponent } from './portfolio-not-found.component';

describe('PortfolioNotFoundComponent', () => {
  let component: PortfolioNotFoundComponent;
  let fixture: ComponentFixture<PortfolioNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortfolioNotFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
