import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from './ingredient.model';
import { UserDataService } from '../service/user-data.service';
@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent {

  constructor(private userData: UserDataService){}

  ingredientsArray:Ingredient[] = []

  onSubmit(form:NgForm){
    this.userData.postRecipe(form.value);
    console.log(form.value);
    

  }
  addIngredient(newIngredient: Ingredient) {
    this.ingredientsArray.push(newIngredient); 
  }
  onResetIngredients(){
    this.ingredientsArray = []
  }
}
