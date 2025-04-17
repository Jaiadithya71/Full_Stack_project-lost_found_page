import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoundItemsService, FoundItem } from '../../services/found-items.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-edit-found-item',
  templateUrl: './edit-found-item.component.html',
  styleUrls: ['./edit-found-item.component.css']
})
export class EditFoundItemComponent implements OnInit {
  form!: FormGroup;
  itemId!: number;
  error: string = '';
  message: string = ''; // ✅ Added for feedback display
  categories: string[] = ['Electronics', 'Clothing', 'Documents', 'Accessories', 'Others'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private foundItemsService: FoundItemsService
  ) {}

  ngOnInit(): void {
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      item_name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      found_location: [''],
      date_found: ['', [Validators.required, pastOrTodayDateValidator]], // Add custom validator
      contact_info: ['', Validators.required]
    });

    this.foundItemsService.getById(this.itemId).subscribe({
      next: (item) => {
        console.log('Received item.date_found:', item.date_found); // Debug log
        const formattedItem = { ...item };
        if (item.date_found) {
          const dateValue = new Date(item.date_found);
          if (!isNaN(dateValue.getTime())) {
            formattedItem.date_found = dateValue;
          } else {
            formattedItem.date_found = new Date();
            this.error = 'Invalid date format received from server.';
          }
        } else {
          formattedItem.date_found = new Date();
        }
        this.form.patchValue(formattedItem);
      },
      error: (err) => {
        this.error = 'Item not found or error fetching data: ' + err.message;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const formattedDate = new Date(formValue.date_found).toISOString().split('T')[0];
    const updatedValue = { ...formValue, date_found: formattedDate };

    this.foundItemsService.update(this.itemId, updatedValue).subscribe({
      next: () => {
        this.message = '✅ Item updated successfully!';
        setTimeout(() => {
          this.message = '';
          this.router.navigate(['/found-items']);
        }, 2000); // Wait for 2 seconds before navigating
      },
      error: (err) => {
        this.message = '❌ Failed to update item. ';
        console.error(err);
        setTimeout(() => {
          this.message = '';
        }, 3000); // Clear after 3 seconds
      }
    });
  }

  get dateFound() {
    return this.form.get('date_found');
  }
}
