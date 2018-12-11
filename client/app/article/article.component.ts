import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from '../services/article.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Article } from '../shared/models/article.model';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent {

  article = new Article();
  articles: Article[] = [];
  isLoading = true;
  isEditing = false;

  addArticleForm: FormGroup;
  title = new FormControl('', Validators.required);
  picture = new FormControl('', Validators.required);
  text = new FormControl('', Validators.required);
  author = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);

  constructor(private articleService: ArticleService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.getArticles();
    this.addArticleForm = this.formBuilder.group({
      title: this.title,
      picture: this.picture,
      text: this.text,
      author: this.author,
      description: this.description,
    });
  }

  getArticles() {
    this.articleService.getArticles().subscribe(
      // data => this.articles = data,
      (data) => {
        this.articles = data,
          console.log("articles", this.articles);
      },
      error => console.log(error),
      () => this.isLoading = false,
    );
  }
}