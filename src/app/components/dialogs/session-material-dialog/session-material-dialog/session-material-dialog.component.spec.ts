import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionMaterialDialogComponent } from './session-material-dialog.component';

describe('SessionMaterialDialogComponent', () => {
  let component: SessionMaterialDialogComponent;
  let fixture: ComponentFixture<SessionMaterialDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionMaterialDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
