import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostItemsListComponent } from './lost-items-list.component';

describe('LostItemsListComponent', () => {
  let component: LostItemsListComponent;
  let fixture: ComponentFixture<LostItemsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LostItemsListComponent]
    });
    fixture = TestBed.createComponent(LostItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
