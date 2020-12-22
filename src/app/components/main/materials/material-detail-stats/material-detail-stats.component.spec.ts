import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDetailStatsComponent } from './material-detail-stats.component';

describe('MaterialDetailStatsComponent', () => {
  let component: MaterialDetailStatsComponent;
  let fixture: ComponentFixture<MaterialDetailStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialDetailStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDetailStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
