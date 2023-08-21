import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent {


  recipes:Recipe[] = [
    new Recipe("1","Shakshuka","20:20:20","20:20:22","20 minutes in oven and leave it out side more 20 minutes"),
    new Recipe("2","Shakshuka","20:20:20","20:20:22","20 minutes in oven and leave it out side more 20 minutes"),
    new Recipe("3","Shakshuka","20:20:20","20:20:22","20 minutes in oven and leave it out side more 20 minutes"),
    new Recipe("4","Shakshuka","20:20:20","20:20:22","20 minutes in oven and leave it out side more 20 minutes"),
    new Recipe("5","Shakshuka","20:20:20","20:20:22","20 minutes in oven and leave it out side more 20 minutes"),
    new Recipe("6","Shakshuka","20:20:20","20:20:22","20 minutes in oven and leave it out side more 20 minutes")
  ];

}
