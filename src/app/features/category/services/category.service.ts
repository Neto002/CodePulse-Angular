import { Injectable } from '@angular/core';
import {AddCategoryRequest} from "../models/add-category-request.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/category.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryEndpointUrl: string = `${environment.apiBaseUrl}/api/Categories`;

  constructor(private http: HttpClient) { }

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(this.categoryEndpointUrl, model);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryEndpointUrl);
  }
}
