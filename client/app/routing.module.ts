import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ArticleAllComponent } from './articleAll/articleAll.component';
import { ArticleIDComponent } from './article_id/article_id.component';
import { DanceIDComponent } from './dance_id/dance_id.component';
import { UploadComponent } from './upload/upload.component';
import { AgendaComponent } from './agenda/agenda.component';
import { StaffComponent } from './staff/staff.component';

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'équipe', component: StaffComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'actualite', component: ArticleAllComponent },
  { path: 'article/:id', component: ArticleIDComponent },
  { path: 'dance/:id', component: DanceIDComponent },
  { path: 'cats', component: CatsComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class RoutingModule {}
