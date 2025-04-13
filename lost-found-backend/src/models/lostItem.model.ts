export interface LostItem {
    id?: number; // optional for insert
    item_name: string;
    category: string;
    description: string;
    last_seen_location?: string;
    date_lost: string; // ISO string or 'YYYY-MM-DD'
    contact_info: string;
    created_at?: string;
  }