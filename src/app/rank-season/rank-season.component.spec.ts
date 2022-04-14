import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankSeasonComponent } from './rank-season.component';

describe('RankSeasonComponent', () => {
  let component: RankSeasonComponent;
  let fixture: ComponentFixture<RankSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankSeasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
