import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastCardsCultureComponent } from './last-cards-culture.component';

describe('LastCardsCultureComponent', () => {
  let component: LastCardsCultureComponent;
  let fixture: ComponentFixture<LastCardsCultureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastCardsCultureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastCardsCultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
