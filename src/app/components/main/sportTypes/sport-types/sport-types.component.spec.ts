import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SportTypesComponent } from './sport-types.component';

describe('SporttypesComponent', () => {
  let component: SportTypesComponent;
  let fixture: ComponentFixture<SportTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
