import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { PanelComponent } from './components/panel/panel.component';
import { AboutComponent } from './components/about/about.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { ClientHomeComponent } from './components/client-home/client-home.component';
import { ClientCheckoutComponent } from './components/client-checkout/client-checkout.component';

const routes: Routes = [
  { path: '', component: ClientHomeComponent },
  { path: 'checkout', component: ClientCheckoutComponent },
  { path: 'panel', component: PanelComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  { path: 'addBook', component: AddBookComponent, canActivate: [AuthGuard]},
  { path: 'books/:id', component: EditBookComponent, canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
  providers: [ AuthGuard ]
})
export class AppRouteModule { }
