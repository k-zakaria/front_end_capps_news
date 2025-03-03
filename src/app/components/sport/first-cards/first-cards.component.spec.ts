import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCardsComponent } from './first-cards.component';

describe('FirstCardsComponent', () => {
  let component: FirstCardsComponent;
  let fixture: ComponentFixture<FirstCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
