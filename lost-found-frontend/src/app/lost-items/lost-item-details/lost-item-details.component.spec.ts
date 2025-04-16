import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostItemDetailsComponent } from './lost-item-details.component';

describe('LostItemDetailsComponent', () => {
  let component: LostItemDetailsComponent;
  let fixture: ComponentFixture<LostItemDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LostItemDetailsComponent]
    });
    fixture = TestBed.createComponent(LostItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
