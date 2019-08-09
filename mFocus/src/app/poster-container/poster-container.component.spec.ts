import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterContainerComponent } from './poster-container.component';

describe('PosterContainerComponent', () => {
  let component: PosterContainerComponent;
  let fixture: ComponentFixture<PosterContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosterContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
