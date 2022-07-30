import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ItemsInterface, keywordTypes } from '../ItemsInterface';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = 'http://localhost:5000'
  private emailUrl = 'http://localhost:3000/email'
  public subjectUpdate = new Subject<any>()
  public subjectCheckoutUpdate = new Subject<any>()

  constructor(private http: HttpClient) { }

  getItems(keyword: keywordTypes): Observable<ItemsInterface[]> {
    const url = `${this.apiUrl}/${keyword}`
    return this.http.get<ItemsInterface[]>(url)
  }

  updateItem(data: ItemsInterface): Observable<ItemsInterface> {
    const url = `${this.apiUrl}/${keywordTypes.items}/${data.id}`
    return this.http.put<ItemsInterface>(url, data, httpOptions)
  }

  getCartedItems(): Observable<ItemsInterface[]> {
    const url = `${this.apiUrl}/${keywordTypes.items}?${keywordTypes.inCart}=${true}`
    return this.http.get<ItemsInterface[]>(url)
  }

  sendMessage(body: any): Observable<any> {
    return this.http.post(this.emailUrl, body, httpOptions)
  }
}
