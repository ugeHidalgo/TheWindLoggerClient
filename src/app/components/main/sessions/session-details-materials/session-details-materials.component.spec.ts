import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDetailsMaterialsComponent } from './session-details-materials.component';

describe('SessionDetailsMaterialsComponent', () => {
  let component: SessionDetailsMaterialsComponent;
  let fixture: ComponentFixture<SessionDetailsMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionDetailsMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionDetailsMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
