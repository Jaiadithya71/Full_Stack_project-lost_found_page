import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LostItem {
  id?: number;
  item_name: string;
  category: string;
  description: string;
  last_seen_location?: string;
  date_lost: string;
  contact_info: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LostItemsService {
  private apiUrl = 'http://localhost:3000/api/lost-items';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LostItem[]> {
    return this.http.get<LostItem[]>(this.apiUrl);
  }

  getById(id: number): Observable<LostItem> {
    return this.http.get<LostItem>(`${this.apiUrl}/${id}`);
  }

  create(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  update(id: number, item: LostItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
