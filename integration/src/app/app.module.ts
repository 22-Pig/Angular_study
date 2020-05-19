import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management/management.component';
import { Routes, Router, RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginGuard } from './login.guard';
import { AuthService } from './auth.service';
import { ExitComponent } from './exit/exit.component';
import { GradeComponent } from './grade/grade.component';
import { UserComponent } from './user/user.component';


const mgtChildrenRoutes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'grade', component: GradeComponent },
  { path: 'exit', component: ExitComponent },
  { path: '', redirectTo: 'user', pathMatch: 'full' }
];

// 定义路由表
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'management',
    component: ManagementComponent,
    children: mgtChildrenRoutes,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ManagementComponent,
    ExitComponent,
    GradeComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes), // 引入路由模块
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
