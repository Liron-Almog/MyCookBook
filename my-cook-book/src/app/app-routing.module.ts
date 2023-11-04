import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MyListComponent } from './my-list/my-list.component';
import { EditListsComponent } from './edit-lists/edit-lists.component';
import { CreateListComponent } from './create-list/create-list.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AutoGuard } from './service/auto-guard.service';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'my-list',canActivate:[AutoGuard], component:MyListComponent},
  {path:'edit-list',canActivate:[AutoGuard], component:EditListsComponent},
  {path:'create-recipe',canActivate:[AutoGuard], component:CreateListComponent},
  {path:'register', component:RegisterComponent},
  {path:'not-found', component:PageNotFoundComponent},
  {path:'**', redirectTo:'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
