import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPostRequest } from "../models/add-blog-post-request.model";
import { BlogPostService } from "../services/blog-post.service";
import { Router } from "@angular/router";
import { CategoryService } from "../../category/services/category.service";
import { Observable, Subscription } from "rxjs";
import { Category } from "../../category/models/category.model";
import { ImageService } from "../../../shared/components/image-selector/services/image.service";

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  model: AddBlogPostRequest;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;

  imageSelectSubscription?: Subscription;

  constructor(private blogPostService: BlogPostService,
              private categoryService: CategoryService,
              private router: Router,
              private imageService: ImageService) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    };
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
      next: (selectedImage) => {
        this.model.featuredImageUrl = selectedImage.url;
        this.closeImageSelector();
      }
    });
  }

  onFormSubmit(): void {
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model).subscribe({
      next: response => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }

  openImageSelector() {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectSubscription?.unsubscribe();
  }
}
