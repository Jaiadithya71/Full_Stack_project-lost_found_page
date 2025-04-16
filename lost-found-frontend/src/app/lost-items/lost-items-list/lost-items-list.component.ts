import { Component, OnInit } from '@angular/core';
import { LostItemsService } from '../../services/lost-items.service';

@Component({
  selector: 'app-lost-items-list',
  templateUrl: './lost-items-list.component.html',
  styleUrls: ['./lost-items-list.component.scss']
})
export class LostItemsListComponent implements OnInit {
  lostItems: any[] = [];
  categories: string[] = ['All', 'Electronics', 'Clothing', 'Documents', 'Accessories', 'Others'];
  selectedCategory: string = 'All';
  searchText: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private lostItemsService: LostItemsService) {}

  ngOnInit(): void {
    this.selectedCategory = 'All';
    this.lostItemsService.getAll().subscribe({
      next: (data) => this.lostItems = data,
      error: (err) => console.error('Error fetching lost items:', err)
    });
  }

  onFilterChange(): void {
    // No-op; used to trigger filtering reactively through [(ngModel)]
  }

  clearDateFilter(): void {
    this.startDate = '';
    this.endDate = '';
    this.onFilterChange();
  }

  filteredItems(): any[] {
    return this.lostItems.filter(item => {
      const matchesCategory =
        this.selectedCategory === 'All' || item.category === this.selectedCategory;

      const matchesSearch =
        this.searchText === '' ||
        item.item_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchText.toLowerCase());

      const itemDate = new Date(item.date_lost);

      const isAfterStart = !this.startDate || itemDate >= new Date(this.startDate);
      const isBeforeEnd = !this.endDate || itemDate <= new Date(this.endDate);

      return matchesCategory && matchesSearch && isAfterStart && isBeforeEnd;
    });
  }
}
