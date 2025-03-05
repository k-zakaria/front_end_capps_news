import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCardsInnovationComponent } from './first-cards-innovation.component';

describe('FirstCardsInnovationComponent', () => {
  let component: FirstCardsInnovationComponent;
  let fixture: ComponentFixture<FirstCardsInnovationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstCardsInnovationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstCardsInnovationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
