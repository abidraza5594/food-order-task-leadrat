import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodDataService {
  private apiUrl = 'https://6544d3e45a0b4b04436d0bfc.mockapi.io/food';
  constructor(private http: HttpClient) { }
  getFoodData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
