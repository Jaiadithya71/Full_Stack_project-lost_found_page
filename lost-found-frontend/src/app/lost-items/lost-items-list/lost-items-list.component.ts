import { Component, OnInit } from '@angular/core';
import { LostItemsService } from '../../services/lost-items.service';

@Component({
  selector: 'app-lost-items-list',
  templateUrl: './lost-items-list.component.html',
  styleUrls: ['./lost-items-list.component.css']
})
export class LostItemsListComponent implements OnInit {
  lostItems: any[] = [];
  categories: string[] = ['All', 'Electronics', 'Clothing', 'Documents', 'Accessories', 'Others'];
  selectedCategory: string = 'All';
  searchText: string = '';
  startDate: Date | null = null;  // Use Date object instead of string
  endDate: Date | null = null;    // Use Date object instead of string

  constructor(private lostItemsService: LostItemsService) {}

  ngOnInit(): void {
    this.selectedCategory = 'All';
    this.lostItemsService.getAll().subscribe({
      next: (data) => this.lostItems = data,
      error: (err) => console.error('Error fetching lost items:', err)
    });
  }

  onFilterChange(): void {
    // Filter logic is now handled by `filteredItems`
  }

  clearDateFilter(): void {
    this.startDate = null;
    this.endDate = null;
    this.searchText = '';  // Optionally clear search text as well
    this.selectedCategory = 'All'; // Optionally reset category
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

      // Check if itemDate is within the selected range
      const isAfterStart = !this.startDate || itemDate >= this.startDate;
      const isBeforeEnd = !this.endDate || itemDate <= this.endDate;

      return matchesCategory && matchesSearch && isAfterStart && isBeforeEnd;
    });
  }
}
