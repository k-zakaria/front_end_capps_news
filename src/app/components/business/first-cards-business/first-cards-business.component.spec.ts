import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCardsBusinessComponent } from './first-cards-business.component';

describe('FirstCardsBusinessComponent', () => {
  let component: FirstCardsBusinessComponent;
  let fixture: ComponentFixture<FirstCardsBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstCardsBusinessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstCardsBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
