import { Component ,Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from '../recipe.model';
import { UserDataService } from 'src/app/service/user-data.service';
import { Ingredient } from 'src/app/create-list/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{

  @Input() recipe;
  public ingredients = null;

  public isLoadingIngredients:boolean;
  private subscriptionisLoadingIngredients: Subscription;

  constructor(private apiService:UserDataService){}


  ngOnInit(): void {
    // Assign the subscriptions in ngOnInit
    this.subscriptionisLoadingIngredients = this.apiService.isLoadingIngredients.subscribe((value) => {
      this.isLoadingIngredients = value;
    });
  }


  changeBoolToString(val:number) :string{

    return val === 1? 'Yes': 'No' ;
  }

  async onClickIngredients(recipeId:number){
    this.ingredients = await this.apiService.getIngredientsByRecipeId(recipeId);
  
    
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions in ngOnDestroy
    this.subscriptionisLoadingIngredients.unsubscribe();
  }

}
