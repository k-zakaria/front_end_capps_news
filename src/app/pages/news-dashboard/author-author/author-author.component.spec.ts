import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorAuthorComponent } from './author-author.component';

describe('AuthorAuthorComponent', () => {
  let component: AuthorAuthorComponent;
  let fixture: ComponentFixture<AuthorAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorAuthorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
