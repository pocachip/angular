import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PSideNavsComponent } from './p-side-navs.component';

describe('PSideNavsComponent', () => {
  let component: PSideNavsComponent;
  let fixture: ComponentFixture<PSideNavsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PSideNavsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PSideNavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
