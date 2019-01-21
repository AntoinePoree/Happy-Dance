import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from '../services/article.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Article } from '../shared/models/article.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article_id',
  templateUrl: './article_id.component.html',
  styleUrls: ['./article_id.component.css'],
})
export class ArticleIDComponent {

  article = new Article();
  id: any;
  picture;
  isLoading = true;

  constructor(private articleService: ArticleService,
    private route: ActivatedRoute,
    public toast: ToastComponent) { }

  ngOnInit() {
    // console.log("route",this.route);
    this.id = this.route.snapshot.paramMap.get('id'),
      this.getArticle();
  }

  getArticle() {
    this.articleService.getArticle(this.id).subscribe(
      data => {
        this.article = data,
          this.picture = "api/file/" + this.article.picture
      }
    );
  }
}