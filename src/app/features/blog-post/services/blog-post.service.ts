import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AddBlogPostRequest } from "../models/add-blog-post-request.model";
import { Observable } from "rxjs";
import { BlogPost } from "../models/blog-post.model";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  private blogPostEndpointUrl: string = `${environment.apiBaseUrl}/blogposts`

  constructor(private http: HttpClient) {
  }

  createBlogPost(model: AddBlogPostRequest): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.blogPostEndpointUrl, model);
  }
}
