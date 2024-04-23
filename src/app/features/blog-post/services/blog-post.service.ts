import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AddBlogPostRequest } from "../models/add-blog-post-request.model";
import { Observable } from "rxjs";
import { BlogPost } from "../models/blog-post.model";
import { environment } from "../../../../environments/environment";
import { UpdateBlogPost } from "../models/update-blog-post.model";

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

  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.blogPostEndpointUrl);
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.blogPostEndpointUrl}/${id}`);
  }

  updateBlogPost(id: string, updatedBlogPost: UpdateBlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.blogPostEndpointUrl}/${id}`, updatedBlogPost);
  }

  deleteBlogPost(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${this.blogPostEndpointUrl}/${id}`);
  }
}
