import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundItemDetailsComponent } from './found-item-details.component';

describe('FoundItemDetailsComponent', () => {
  let component: FoundItemDetailsComponent;
  let fixture: ComponentFixture<FoundItemDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoundItemDetailsComponent]
    });
    fixture = TestBed.createComponent(FoundItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
