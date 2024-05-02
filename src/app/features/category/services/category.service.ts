import { Injectable } from '@angular/core';
import { AddCategoryRequest } from "../models/add-category-request.model";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Category } from "../models/category.model";
import { environment } from "../../../../environments/environment";
import { UpdateCategoryRequest } from "../models/update-category-request.model";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryEndpointUrl: string = `${environment.apiBaseUrl}/categories`;

  constructor(private http: HttpClient,
              private cookieService: CookieService,) {
  }

  getAllCategories(query?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<Category[]> {
    let params: HttpParams = new HttpParams();

    if (query) {
      params = params.set('query', query);
    }

    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }

    if (sortDirection) {
      params = params.set('sortDirection', sortDirection);
    }

    if (pageNumber) {
      params = params.set('pageNumber', pageNumber);
    }

    if (pageSize) {
      params = params.set('pageSize', pageSize);
    }

    return this.http.get<Category[]>(this.categoryEndpointUrl, {
      params: params
    });
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.categoryEndpointUrl}/${id}`);
  }

  getCategoryCount(): Observable<number> {
    return this.http.get<number>(`${this.categoryEndpointUrl}/count`);
  }

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${this.categoryEndpointUrl}?addAuth=true`, model);
  }

  updateCategory(id: string, model: UpdateCategoryRequest): Observable<Category> {
    return this.http.put<Category>(`${this.categoryEndpointUrl}/${id}?addAuth=true`, model);
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.categoryEndpointUrl}/${id}?addAuth=true`);
  }
}
