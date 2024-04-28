import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { BlogImage } from "../models/blog-image.model";
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imagesEndpointUrl: string = `${environment.apiBaseUrl}/images`;

  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileExtension: '',
    fileName: '',
    title: '',
    url: ''
  });

  constructor(private http: HttpClient) {
  }

  uploadImage(file: File, fileName: string, title: string): Observable<BlogImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.http.post<BlogImage>(this.imagesEndpointUrl, formData);
  }

  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(this.imagesEndpointUrl);
  }

  selectImage(image: BlogImage): void {
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
}
