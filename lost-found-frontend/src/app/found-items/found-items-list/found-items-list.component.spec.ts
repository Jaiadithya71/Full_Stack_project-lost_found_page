import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundItemsListComponent } from './found-items-list.component';

describe('FoundItemsListComponent', () => {
  let component: FoundItemsListComponent;
  let fixture: ComponentFixture<FoundItemsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoundItemsListComponent]
    });
    fixture = TestBed.createComponent(FoundItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
