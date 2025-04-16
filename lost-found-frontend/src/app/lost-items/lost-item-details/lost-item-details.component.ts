import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LostItemsService, LostItem } from '../../services/lost-items.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // For feedback (optional)

@Component({
  selector: 'app-lost-item-details',
  templateUrl: './lost-item-details.component.html',
  styleUrls: ['./lost-item-details.component.scss']
})
export class LostItemDetailsComponent implements OnInit {
  item: LostItem | null = null;
  error: string = '';
  showContact: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private lostItemsService: LostItemsService,
    private router: Router,
    private snackBar: MatSnackBar // Optional for success/error messages
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.lostItemsService.getById(id).subscribe({
        next: (data) => this.item = data,
        error: () => this.error = 'Lost item not found.'
      });
    } else {
      this.error = 'Invalid item ID.';
    }
  }

  deleteItem(): void {
    if (!this.item?.id) return;
  
    if (confirm('Are you sure you want to delete this item?')) {
      this.lostItemsService.delete(this.item.id).subscribe({
        next: () => {
          this.router.navigate(['/lost-items']);
          this.snackBar.open('Item deleted successfully.', 'Close', { duration: 3000 }); // Optional feedback
        },
        error: () => alert('Failed to delete item.')
      });
    }
  }

  toggleContact(): void {
    this.showContact = !this.showContact;
  }
}