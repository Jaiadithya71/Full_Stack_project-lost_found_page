import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoundItemsService, FoundItem } from '../../services/found-items.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-found-item',
  templateUrl: './edit-found-item.component.html',
  styleUrls: ['./edit-found-item.component.scss']
})
export class EditFoundItemComponent implements OnInit {
  form!: FormGroup;
  itemId!: number;
  error: string = '';
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
      date_found: ['', Validators.required],
      contact_info: ['', Validators.required]
    });

    this.foundItemsService.getById(this.itemId).subscribe({
      next: (item) => {
        console.log('Received item.date_found:', item.date_found); // Debug log
        const formattedItem = { ...item };
        if (item.date_found) {
          // Convert to Date object for matDatepicker
          const dateValue = new Date(item.date_found);
          if (!isNaN(dateValue.getTime())) {
            formattedItem.date_found = dateValue; // Use Date object
          } else {
            formattedItem.date_found = new Date(); // Fallback to current date
            this.error = 'Invalid date format received from server.';
          }
        } else {
          formattedItem.date_found = new Date(); // Fallback for null/undefined
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
    // Format date_found to YYYY-MM-DD string for the backend
    const formattedDate = new Date(formValue.date_found).toISOString().split('T')[0];
    const updatedValue = { ...formValue, date_found: formattedDate };

    this.foundItemsService.update(this.itemId, updatedValue).subscribe({
      next: () => {
        console.log('Item updated successfully');
        this.router.navigate(['/found-items']);
      },
      error: (err) => {
        this.error = 'Failed to update item: ' + err.message;
        console.error(err);
      }
    });
  }
}