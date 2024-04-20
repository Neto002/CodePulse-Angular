import { Injectable } from '@angular/core';
import { AddCategoryRequest } from "../models/add-category-request.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Category } from "../models/category.model";
import { environment } from "../../../../environments/environment";
import { UpdateCategoryRequest } from "../models/update-category-request.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryEndpointUrl: string = `${environment.apiBaseUrl}/categories`;

  constructor(private http: HttpClient) {
  }

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(this.categoryEndpointUrl, model);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryEndpointUrl);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.categoryEndpointUrl}/${id}`);
  }

  updateCategory(id: string, model: UpdateCategoryRequest): Observable<Category> {
    return this.http.put<Category>(`${this.categoryEndpointUrl}/${id}`, model);
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.categoryEndpointUrl}/${id}`);
  }
}
