import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LostItemsService } from '../../services/lost-items.service';
import { Router } from '@angular/router';

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
  selector: 'app-lost-item-form',
  templateUrl: './lost-item-form.component.html',
  styleUrls: ['./lost-item-form.component.css']
})
export class LostItemFormComponent {
  lostItemForm: FormGroup;
  message: string = '';
  categories: string[] = ['Electronics', 'Clothing', 'Documents', 'Accessories', 'Others'];

  constructor(
    private fb: FormBuilder,
    private lostItemsService: LostItemsService,
    private router: Router
  ) {
    this.lostItemForm = this.fb.group({
      item_name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      last_seen_location: [''],
      date_lost: ['', [Validators.required, pastOrTodayDateValidator]],
      contact_info: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.lostItemForm.invalid) return;
  
    const formValue = this.lostItemForm.value;
    const formattedDate = new Date(formValue.date_lost).toISOString().split('T')[0];
    const submissionData = { ...formValue, date_lost: formattedDate };
  
    // Step 1: Get all existing lost items to check for duplicates
    this.lostItemsService.getAll().subscribe((existingItems) => {
      const isDuplicate = existingItems.some(item =>
        item.item_name.toLowerCase() === submissionData.item_name.toLowerCase() &&
        item.date_lost === submissionData.date_lost &&
        item.last_seen_location?.toLowerCase() === submissionData.last_seen_location?.toLowerCase()
      );
  
      if (isDuplicate) {
        this.message = '⚠️ This lost item has already been reported.';
      } else {
        // Step 2: Create the item
        this.lostItemsService.create(submissionData).subscribe({
          next: () => {
            this.message = '✅ Lost item reported successfully!';
            this.lostItemForm.reset();
            this.router.navigate(['/lost-items']);
          },
          error: (err) => {
            this.message = '❌ Failed to report lost item.';
            console.error('Error submitting form:', err);
          }
        });
      }
    });
  }

  // Optional: Getter to check validation status in template
  get dateLost() {
    return this.lostItemForm.get('date_lost');
  }
}
