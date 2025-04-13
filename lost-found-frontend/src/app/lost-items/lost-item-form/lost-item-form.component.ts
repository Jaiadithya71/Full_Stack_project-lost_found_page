  import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { LostItemsService } from '../../services/lost-items.service';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-lost-item-form',
    templateUrl: './lost-item-form.component.html',
    styleUrls: ['./lost-item-form.component.scss']
  })
  export class LostItemFormComponent {
    lostItemForm: FormGroup;
    message: string = '';
    categories: string[] = ['All', 'Electronics', 'Clothing', 'Documents', 'Accessories', 'Others'];

    constructor(
      private fb: FormBuilder,
      private lostItemsService: LostItemsService,
      private router: Router // Added Router for navigation
    ) {
      this.lostItemForm = this.fb.group({
        item_name: ['', Validators.required],
        category: ['', Validators.required],
        description: ['', Validators.required],
        last_seen_location: [''],
        date_lost: ['', Validators.required],
        contact_info: ['', Validators.required],
      });
    }

    onSubmit(): void {
      if (this.lostItemForm.invalid) return;

      this.lostItemsService.create(this.lostItemForm.value).subscribe({
        next: () => {
          this.message = '✅ Lost item reported successfully!';
          this.lostItemForm.reset();
          this.router.navigate(['/lost-items']); // Navigate to lost items list after success
        },
        error: (err) => {
          this.message = '❌ Failed to report lost item.';
          console.error('Error submitting form:', err); // Log error for debugging
        }
      });
    }
  }