export interface FoundItem {
    id: number;
    item_name: string;
    category: string;
    description: string;
    found_location: string;
    date_found: Date; // Allow Date for flexibility with date handling
    contact_info: string;
    created_at: Date; // Allow Date for flexibility with timestamp handling
  }
  
  export default FoundItem;