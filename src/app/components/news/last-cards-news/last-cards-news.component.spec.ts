import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastCardsNewsComponent } from './last-cards-news.component';

describe('LastCardsNewsComponent', () => {
  let component: LastCardsNewsComponent;
  let fixture: ComponentFixture<LastCardsNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastCardsNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastCardsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
