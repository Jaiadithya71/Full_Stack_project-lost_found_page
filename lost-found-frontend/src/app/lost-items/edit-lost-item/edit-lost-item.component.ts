import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LostItemsService, LostItem } from '../../services/lost-items.service';

// Custom validator to ensure date is not in the future
function pastOrTodayDateValidator(control: any) {
  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to midnight for comparison

  if (selectedDate > today) {
    return { futureDate: true }; // Return error object if date is in the future
  }
  return null; // Valid if date is past or today
}

@Component({
  selector: 'app-edit-lost-item',
  templateUrl: './edit-lost-item.component.html',
  styleUrls: ['./edit-lost-item.component.scss']
})
export class EditLostItemComponent implements OnInit {
  form!: FormGroup;
  itemId!: number;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lostItemsService: LostItemsService
  ) {}

  ngOnInit(): void {
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      item_name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      last_seen_location: [''],
      date_lost: ['', [Validators.required, pastOrTodayDateValidator]], // Add custom validator
      contact_info: ['', Validators.required]
    });

    this.lostItemsService.getById(this.itemId).subscribe({
      next: (item) => {
        // Ensure date_lost is in a format compatible with the form (e.g., 'YYYY-MM-DD')
        const formattedItem = { ...item };
        if (item.date_lost) {
          formattedItem.date_lost = new Date(item.date_lost).toISOString().split('T')[0];
        }
        this.form.patchValue(formattedItem);
      },
      error: () => this.error = 'Item not found.'
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
  
    const formValue = this.form.value;
    const formattedDate = new Date(formValue.date_lost).toISOString().split('T')[0];
    const updatedValue = { ...formValue, date_lost: formattedDate };
  
    this.lostItemsService.update(this.itemId, updatedValue).subscribe({
      next: () => {
        console.log('Item updated successfully');
        this.router.navigate(['/lost-items']); // Ensures navigation back
      },
      error: (err) => {
        this.error = 'Failed to update item: ' + err.message;
        console.error(err);
      }
    });
  }

  // Optional: Getter to check validation status in template
  get dateLost() {
    return this.form.get('date_lost');
  }
}