import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { CatService } from './services/cat.service';
import { BureauService } from './services/bureau.service';
import { ProfService } from './services/prof.service';
import { ArticleService } from './services/article.service';
import { DanceService } from './services/dance.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AgendaComponent } from './agenda/agenda.component';
import { HomeComponent } from './home/home.component';
import { EquipeComponent } from './equipe/equipe.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticleComponent } from './article/article.component';
import { ArticleIDComponent } from './article_id/article_id.component';
import { DanceIDComponent } from './dance_id/dance_id.component';
import { ArticlesAdminComponent } from './article_admin/article_admin.component';
import { DancesAdminComponent } from './dance_admin/dance_admin.component';
import { StaffComponent } from './staff/staff.component';
import { StaffAdminComponent } from './staff_admin/staff_admin.component';
import { UploadComponent } from './upload/upload.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    DanceIDComponent,
    DancesAdminComponent,
    ArticleIDComponent,
    ArticlesAdminComponent,
    AboutComponent,
    StaffComponent,
    StaffAdminComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    HomeComponent,
    ArticleComponent,
    NavbarComponent,
    AgendaComponent,
    EquipeComponent,
    UploadComponent
  ],
  imports: [
    RoutingModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        // whitelistedDomains: ['localhost:3000', 'localhost:4200']
      },
    }),
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CatService,
    BureauService,
    ProfService,
    ArticleService,
    DanceService,
    UserService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})

export class AppModule { }
