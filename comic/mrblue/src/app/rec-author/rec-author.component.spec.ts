import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecAuthorComponent } from './rec-author.component';

describe('RecAuthorComponent', () => {
  let component: RecAuthorComponent;
  let fixture: ComponentFixture<RecAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
