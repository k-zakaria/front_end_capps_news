import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastCardsBusinessComponent } from './last-cards-business.component';

describe('LastCardsBusinessComponent', () => {
  let component: LastCardsBusinessComponent;
  let fixture: ComponentFixture<LastCardsBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastCardsBusinessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastCardsBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
