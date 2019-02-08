import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { ArticleService } from '../services/article.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Article } from '../shared/models/article.model';

@Component({
  selector: 'app-article_admin',
  templateUrl: './article_admin.component.html',
  styleUrls: ['./article_admin.component.css'],
})
export class ArticlesAdminComponent implements OnInit {

  article = new Article();
  articles: Article[] = [];
  isLoading = true;
  isEditing = false;

  addArticleForm: FormGroup;
  title = new FormControl('', Validators.required);
  picture = new FormControl('');
  text = new FormControl('', Validators.required);
  author = new FormControl('');
  description = new FormControl('', Validators.required);

  filename: string;
  uploadOk: boolean;

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

  onFileUploaded = (filename) => {
    this.filename = filename;
    // console.log("filename",filename);
  }

  getArticles() {
    this.articleService.getArticles().subscribe(
      (data) => {
        this.articles = data,
        this.articles.reverse()
          //  console.log("articles", this.articles);
      },
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  addArticle() {
    this.addArticleForm.value.picture = this.filename,
    this.addArticleForm.value.author = "Happy-Danse",
      this.articleService.addArticle(this.addArticleForm.value).subscribe(
        (res) => {
          this.articles.push(res);
          // console.log("articles", this.articles,"res", res)
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
    article.picture = this.filename;
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
