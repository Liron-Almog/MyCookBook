import { Component ,Input, OnChanges, SimpleChanges } from '@angular/core';
import { Recipe } from '../recipe.model';
import { UserDataService } from 'src/app/service/user-data.service';
import { Ingredient } from 'src/app/create-list/ingredient.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  @Input() recipe;
  public ingredients = [];

  constructor(private apiService:UserDataService){}

  changeBoolToString(val:number) :string{

    return val === 1? 'Yes': 'No' ;
  }

  async onClickIngredients(recipeId:number){
    event.preventDefault(); // Prevent form submission
    this.ingredients = await this.apiService.getIngredientsByRecipeId(recipeId);
    console.log('ing');
    console.log( this.ingredients);
    
  }

}
