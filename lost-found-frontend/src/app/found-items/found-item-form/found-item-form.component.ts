import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoundItemsService, FoundItem } from '../../services/found-items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-found-item-form',
  templateUrl: './found-item-form.component.html',
  styleUrls: ['./found-item-form.component.scss']
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
      date_found: ['', Validators.required],
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
}