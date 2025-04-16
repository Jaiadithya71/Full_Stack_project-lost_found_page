import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FoundItem {
  id?: number;
  item_name: string;
  category: string;
  description: string;
  found_location?: string;
  date_found: Date;
  contact_info: string;
  created_at?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class FoundItemsService {
  private apiUrl = 'http://localhost:3000/api/found-items';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FoundItem[]> {
    return this.http.get<FoundItem[]>(this.apiUrl);
  }

  getById(id: number): Observable<FoundItem> {
    return this.http.get<FoundItem>(`${this.apiUrl}/${id}`);
  }

  create(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  update(id: number, item: FoundItem): Observable<any> {
    return this.http.put<FoundItem>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}