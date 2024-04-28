import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from "../../blog-post/services/blog-post.service";
import { ActivatedRoute } from "@angular/router";
import { BlogPost } from "../../blog-post/models/blog-post.model";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  url: string | null = null;
  blogPost$?: Observable<BlogPost>;

  constructor(private blogPostService: BlogPostService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.url = params.get('url');
      }
    });

    // Fetch blog by url
    if (this.url) {
      this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);
    }
  }
}
