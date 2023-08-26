import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyListComponent } from './my-list/my-list.component';
import { EditListsComponent } from './edit-lists/edit-lists.component';
import { CreateListComponent } from './create-list/create-list.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'my-lists', component:MyListComponent},
  {path:'edit-lists', component:EditListsComponent},
  {path:'create-recipe', component:CreateListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
