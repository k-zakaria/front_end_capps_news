import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCardsArtsComponent } from './first-cards-arts.component';

describe('FirstCardsArtsComponent', () => {
  let component: FirstCardsArtsComponent;
  let fixture: ComponentFixture<FirstCardsArtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstCardsArtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstCardsArtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
