import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTypesComponent } from './material-types.component';

describe('MaterialTypesComponent', () => {
  let component: MaterialTypesComponent;
  let fixture: ComponentFixture<MaterialTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
