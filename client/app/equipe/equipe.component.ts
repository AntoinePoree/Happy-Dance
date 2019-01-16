import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { ArticleService } from '../services/article.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Article } from '../shared/models/article.model';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css'],
})
export class EquipeComponent implements OnInit {

  article = new Article();
  articles: Article[] = [];
  isLoading = true;
  isEditing = false;

  addArticleForm: FormGroup;
  title = new FormControl('', Validators.required);
  picture = new FormControl('');
  text = new FormControl('', Validators.required);
  author = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);


  constructor(private articleService: ArticleService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent) { }

  ngOnInit() {
    console.log("Called");
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
      (data) => {
        this.articles = data,
          console.log("this articles",this.articles);
      },
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  addArticle() {
    this.articleService.addArticle(this.addArticleForm.value).subscribe(
      (res) => {
        this.articles.push(res);
        this.addArticleForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  enableEditing(article: Article) {
    this.isEditing = true;
    this.article = article;
  }

  cancelEditing() {
    this.isEditing = false;
    this.article = new Article();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the articles to reset the editing
    this.getArticles();
  }

  editArticle(article: Article) {
    this.articleService.editArticle(article).subscribe(
      () => {
        this.isEditing = false;
        this.article = article;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  deleteArticle(article: Article) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.articleService.deleteArticle(article).subscribe(
        () => {
          const pos = this.articles.map(elem => elem._id).indexOf(article._id);
          this.articles.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }

}
