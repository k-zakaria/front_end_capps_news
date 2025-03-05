import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCardsEarthComponent } from './first-cards-earth.component';

describe('FirstCardsEarthComponent', () => {
  let component: FirstCardsEarthComponent;
  let fixture: ComponentFixture<FirstCardsEarthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstCardsEarthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstCardsEarthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
