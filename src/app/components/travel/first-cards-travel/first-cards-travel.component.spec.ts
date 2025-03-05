import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCardsTravelComponent } from './first-cards-travel.component';

describe('FirstCardsTravelComponent', () => {
  let component: FirstCardsTravelComponent;
  let fixture: ComponentFixture<FirstCardsTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstCardsTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstCardsTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
