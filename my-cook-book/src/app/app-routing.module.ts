import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MyListComponent } from './my-list/my-list.component';
import { EditListsComponent } from './edit-lists/edit-lists.component';
import { CreateListComponent } from './create-list/create-list.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'my-list', component:MyListComponent},
  {path:'edit-list', component:EditListsComponent},
  {path:'create-recipe', component:CreateListComponent},
  {path:'register', component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
