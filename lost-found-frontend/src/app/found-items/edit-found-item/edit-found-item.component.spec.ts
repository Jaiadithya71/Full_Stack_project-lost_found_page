import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoundItemComponent } from './edit-found-item.component';

describe('EditFoundItemComponent', () => {
  let component: EditFoundItemComponent;
  let fixture: ComponentFixture<EditFoundItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFoundItemComponent]
    });
    fixture = TestBed.createComponent(EditFoundItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
