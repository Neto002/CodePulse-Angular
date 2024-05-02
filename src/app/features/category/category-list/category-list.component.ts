import { Component, OnInit } from '@angular/core';
import { Category } from "../models/category.model";
import { CategoryService } from "../services/category.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories$?: Observable<Category[]>;
  totalCount?: number;
  list: number[] = []
  query: string = '';
  pageNumber: number = 1;
  pageSize: number = 3;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategoryCount().subscribe({
      next: (count) => {
        this.totalCount = count;
        this.list = new Array(Math.ceil(count / this.pageSize));

        this.getAllCategories();
      }
    })

  }

  getAllCategories(pageNumber?: number) {
    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      pageNumber ?? this.pageNumber,
      this.pageSize
    );
  }

  onSearch() {
    this.categories$ = this.categoryService.getAllCategories(this.query);
  }

  sort(sortBy: string, sortDirection: string, pageNumber?: number, pageSize?: number) {
    console.log(this.pageNumber)
    this.categories$ = this.categoryService.getAllCategories(
      this.query,
      sortBy,
      sortDirection,
      pageNumber ?? this.pageNumber,
      pageSize ?? this.pageSize
    );
  }

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getAllCategories(pageNumber);
  }

  getPrevPage() {
    if (this.pageNumber - 1 < 1) {
      return;
    }

    this.pageNumber--;
    this.getPage(this.pageNumber);
  }

  getNextPage() {
    if (this.pageNumber + 1 > this.list.length) {
      return;
    }

    this.pageNumber++;
    this.getPage(this.pageNumber);
  }
}
