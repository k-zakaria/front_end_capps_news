import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastCardsTravelComponent } from './last-cards-travel.component';

describe('LastCardsTravelComponent', () => {
  let component: LastCardsTravelComponent;
  let fixture: ComponentFixture<LastCardsTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastCardsTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastCardsTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
