import { Component } from '@angular/core';

import { ArticleService } from '../services/article.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Article } from '../shared/models/article.model';
@Component({
  selector: 'app-articleAll',
  templateUrl: './articleAll.component.html',
  styleUrls: ['./articleAll.component.css'],
})
export class ArticleAllComponent {

  article = new Article();
  articles: Article[] = [];
  isLoading = true;
 

  constructor(private articleService: ArticleService,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles().subscribe(
      // data => this.articles = data,
      (data) => {
        this.articles = data,
        this.articles.reverse()
          //  console.log("articles", this.articles);
      },
      error => console.log(error),
      () => this.isLoading = false,
    );
  }
}