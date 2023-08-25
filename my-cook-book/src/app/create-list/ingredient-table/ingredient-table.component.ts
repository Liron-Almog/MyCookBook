import { Component ,Input} from '@angular/core';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-ingredient-table',
  templateUrl: './ingredient-table.component.html',
  styleUrls: ['./ingredient-table.component.css']
})
export class IngredientTableComponent {

  @Input() ingredientsArray:Ingredient[] 
  colNames = ['#','Ingredient','Type','Quantity','Delete']

  onDeleteClick(i:number){
    this.ingredientsArray.splice(i, 1);
  }
}
