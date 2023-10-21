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
import { FormsModule } from '@angular/forms';
import { AddIngredientComponent } from './create-list/add-ingredient/add-ingredient.component';
import { IngredientTableComponent } from './create-list/ingredient-table/ingredient-table.component';
import { MyLogoComponent } from './my-logo/my-logo.component';
import { RegisterComponent } from './register/register.component';




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
    AddIngredientComponent,
    IngredientTableComponent,
    MyLogoComponent,
    RegisterComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
