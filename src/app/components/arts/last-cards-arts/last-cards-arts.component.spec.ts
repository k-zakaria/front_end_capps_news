import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastCardsArtsComponent } from './last-cards-arts.component';

describe('LastCardsArtsComponent', () => {
  let component: LastCardsArtsComponent;
  let fixture: ComponentFixture<LastCardsArtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastCardsArtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastCardsArtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
