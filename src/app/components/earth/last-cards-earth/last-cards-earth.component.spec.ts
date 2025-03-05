import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastCardsEarthComponent } from './last-cards-earth.component';

describe('LastCardsEarthComponent', () => {
  let component: LastCardsEarthComponent;
  let fixture: ComponentFixture<LastCardsEarthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastCardsEarthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastCardsEarthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
