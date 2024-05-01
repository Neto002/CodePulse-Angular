import { Injectable } from '@angular/core';
import { AddCategoryRequest } from "../models/add-category-request.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
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

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryEndpointUrl);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.categoryEndpointUrl}/${id}`);
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
