import { Component, OnInit } from '@angular/core';
import { FoundItemsService, FoundItem } from '../../services/found-items.service';

@Component({
  selector: 'app-found-items-list',
  templateUrl: './found-items-list.component.html',
  styleUrls: ['./found-items-list.component.scss']
})
export class FoundItemsListComponent implements OnInit {
  foundItems: FoundItem[] = [];
  categories: string[] = ['All', 'Electronics', 'Clothing', 'Documents', 'Accessories', 'Others'];
  selectedCategory: string = 'All';
  searchText: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private foundItemsService: FoundItemsService) {}

  ngOnInit(): void {
    this.selectedCategory = 'All';
    this.foundItemsService.getAll().subscribe({
      next: (data) => {
        this.foundItems = data;
        console.log('Fetched foundItems with dates:', data.map(item => item.date_found));
      },
      error: (err) => console.error('Error fetching found items:', err)
    });
  }

  onFilterChange(): void {
    console.log('Filter changed - startDate:', this.startDate, 'endDate:', this.endDate);
    // No action needed as filteredItems() is reactive
  }

  clearDateFilter(): void {
    this.startDate = '';
    this.endDate = '';
    this.onFilterChange();
  }

  filteredItems(): FoundItem[] {
    return this.foundItems.filter(item => {
      const matchesCategory = this.selectedCategory === 'All' || item.category === this.selectedCategory;
      const matchesSearch =
        this.searchText === '' ||
        item.item_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchText.toLowerCase());

      // Ensure item.date_found is a Date object
      const itemDate = item.date_found instanceof Date ? item.date_found : new Date(item.date_found);
      const start = this.startDate ? new Date(this.startDate) : null;
      const end = this.endDate ? new Date(this.endDate) : null;

      const isAfterStart = !start || !isNaN(start.getTime()) && itemDate >= start;
      const isBeforeEnd = !end || !isNaN(end.getTime()) && itemDate <= end;

      console.log(`Item: ${item.item_name}, Date: ${itemDate}, Start: ${start}, End: ${end}, AfterStart: ${isAfterStart}, BeforeEnd: ${isBeforeEnd}`);

      return matchesCategory && matchesSearch && isAfterStart && isBeforeEnd;
    });
  }
}