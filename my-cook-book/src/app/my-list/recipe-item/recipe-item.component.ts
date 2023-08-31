import { Component ,Input, OnChanges, SimpleChanges } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnChanges{

  @Input() recipe;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.recipe);
    
  }
  changeBoolToString(val:number) :string{

    return val === 1? 'Yes': 'No' ;
  }

}
