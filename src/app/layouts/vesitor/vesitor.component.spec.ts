import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesitorComponent } from './vesitor.component';

describe('VesitorComponent', () => {
  let component: VesitorComponent;
  let fixture: ComponentFixture<VesitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VesitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VesitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
