import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastCardsInnovationComponent } from './last-cards-innovation.component';

describe('LastCardsInnovationComponent', () => {
  let component: LastCardsInnovationComponent;
  let fixture: ComponentFixture<LastCardsInnovationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastCardsInnovationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastCardsInnovationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
