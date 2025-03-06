import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCardsNewsComponent } from './first-cards-news.component';

describe('FirstCardsNewsComponent', () => {
  let component: FirstCardsNewsComponent;
  let fixture: ComponentFixture<FirstCardsNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstCardsNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstCardsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
