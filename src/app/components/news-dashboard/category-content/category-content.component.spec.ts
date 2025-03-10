import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryContentComponent } from './category-content.component';

describe('CategoryContentComponent', () => {
  let component: CategoryContentComponent;
  let fixture: ComponentFixture<CategoryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
