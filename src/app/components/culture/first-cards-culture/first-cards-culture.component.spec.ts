import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCardsCultureComponent } from './first-cards-culture.component';

describe('FirstCardsCultureComponent', () => {
  let component: FirstCardsCultureComponent;
  let fixture: ComponentFixture<FirstCardsCultureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstCardsCultureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstCardsCultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
