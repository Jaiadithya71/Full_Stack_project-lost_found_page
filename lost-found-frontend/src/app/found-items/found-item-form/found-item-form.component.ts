import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoundItemsService, FoundItem } from '../../services/found-items.service';
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
  selector: 'app-found-item-form',
  templateUrl: './found-item-form.component.html',
  styleUrls: ['./found-item-form.component.css']
})
export class FoundItemFormComponent {
  foundItemForm: FormGroup;
  message: string = '';
  categories: string[] = ['Electronics', 'Clothing', 'Documents', 'Accessories', 'Others'];

  constructor(
    private fb: FormBuilder,
    private foundItemsService: FoundItemsService,
    private router: Router
  ) {
    this.foundItemForm = this.fb.group({
      item_name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      found_location: [''],
      date_found: ['', [Validators.required, pastOrTodayDateValidator]], // Add custom validator
      contact_info: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.foundItemForm.invalid) return;

    this.foundItemsService.create(this.foundItemForm.value).subscribe({
      next: () => {
        this.message = '✅ Found item reported successfully!';
        this.foundItemForm.reset();
        this.router.navigate(['/found-items']);
      },
      error: (err) => {
        this.message = '❌ Failed to report found item.';
        console.error('Error submitting form:', err);
      }
    });
  }

  // Optional: Getter to check validation status in template
  get dateFound() {
    return this.foundItemForm.get('date_found');
  }
}
