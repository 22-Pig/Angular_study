import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ManagementComponentComponent } from './management-component/management-component.component';
import { UserManagementComponentComponent } from './user-management-component/user-management-component.component';
import { ProductComponentComponent } from './product-component/product-component.component';
import { ExitComponentComponent } from './exit-component/exit-component.component';
import { Routes, Router, RouterModule } from '@angular/router';

const mgtChildrenRoutes: Routes = [
  { path: 'user', component: UserManagementComponentComponent },
  { path: 'product', component: ProductComponentComponent },
  { path: 'exit', component: ExitComponentComponent },
  { path: '', redirectTo: 'user', pathMatch: 'full' }
];



const routes: Routes = [
  { path: 'home', component: HomeComponentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent },
  { path: 'management', component: ManagementComponentComponent, children: mgtChildrenRoutes }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    LoginComponentComponent,
    ManagementComponentComponent,
    UserManagementComponentComponent,
    ProductComponentComponent,
    ExitComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes) // 引入路由模块
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
