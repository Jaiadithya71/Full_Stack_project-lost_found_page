import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoundItemsService, FoundItem } from '../../services/found-items.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // For feedback

@Component({
  selector: 'app-found-item-details',
  templateUrl: './found-item-details.component.html',
  styleUrls: ['./found-item-details.component.css']
})
export class FoundItemDetailsComponent implements OnInit {
  foundItem: FoundItem | null = null;
  error: string = '';
  showContact: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private foundItemsService: FoundItemsService,
    private router: Router,
    private snackBar: MatSnackBar // Added for success/error messages
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.foundItemsService.getById(id).subscribe({
        next: (data) => this.foundItem = data,
        error: () => this.error = 'Found item not found.'
      });
    } else {
      this.error = 'Invalid item ID.';
    }
  }

  deleteItem(): void {
    if (!this.foundItem?.id) return;

    if (confirm('Are you sure you want to delete this item?')) {
      this.foundItemsService.delete(this.foundItem.id).subscribe({
        next: () => {
          this.router.navigate(['/found-items']);
          this.snackBar.open('Item deleted successfully.', 'Close', { duration: 3000 }); // Feedback
        },
        error: () => alert('Failed to delete item.')
      });
    }
  }

  toggleContact(): void {
    this.showContact = !this.showContact;
  }

  editItem(): void {
    if (this.foundItem) {
      this.router.navigate([`/found-items/edit/${this.foundItem.id}`]);
    }
  }
}
