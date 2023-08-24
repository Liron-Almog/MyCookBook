import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MyListComponent } from './my-list/my-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CreateListComponent } from './create-list/create-list.component';
import { EditListsComponent } from './edit-lists/edit-lists.component';
import { RecipesListComponent } from './my-list/recipes-list/recipes-list.component';
import { RecipeItemComponent } from './my-list/recipe-item/recipe-item.component';
import {HttpClientModule} from '@angular/common/http';
import { TableComponent } from './edit-lists/table/table.component';
import { TableRowItemComponent } from './edit-lists/table-row-item/table-row-item.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyListComponent,
    NavBarComponent,
    CreateListComponent,
    EditListsComponent,
    RecipesListComponent,
    RecipeItemComponent,
    TableComponent,
    TableRowItemComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
