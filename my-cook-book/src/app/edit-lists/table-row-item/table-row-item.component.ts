import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/my-list/recipe.model';

@Component({
  selector: 'app-table-row-item',
  templateUrl: './table-row-item.component.html',
  styleUrls: ['./table-row-item.component.css']
})
export class TableRowItemComponent {
  @Input() recipe: Recipe;
}
