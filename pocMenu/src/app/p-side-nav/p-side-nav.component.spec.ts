import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PSideNavComponent } from './p-side-nav.component';

describe('PSideNavComponent', () => {
  let component: PSideNavComponent;
  let fixture: ComponentFixture<PSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
