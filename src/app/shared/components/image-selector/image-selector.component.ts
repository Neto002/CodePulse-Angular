import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImageService } from "./services/image.service";
import { Observable, Subscription } from "rxjs";
import { BlogImage } from "./models/blog-image.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit, OnDestroy {
  private file?: File;
  fileName: string = '';
  title: string = '';
  images$?: Observable<BlogImage[]>;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;

  uploadImageSubscription?: Subscription;

  constructor(private imageService: ImageService,) {
  }

  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void {
    if (this.file && this.fileName !== '' && this.title !== '') {
      // Use Image service to upload image
      this.uploadImageSubscription = this.imageService.uploadImage(this.file, this.title, this.fileName).subscribe({
        next: (response) => {
          this.imageUploadForm?.resetForm();
          this.getImages();
        }
      });
    }
  }

  private getImages(): void {
    this.images$ = this.imageService.getAllImages();
  }

  selectImage(image: BlogImage): void {
    this.imageService.selectImage(image);
  }

  ngOnDestroy(): void {
    this.uploadImageSubscription?.unsubscribe();
  }
}
