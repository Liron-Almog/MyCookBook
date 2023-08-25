import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent {

  @Output() newIngredient = new EventEmitter<Ingredient>();

  onAddIngredient(form: NgForm) {
    this.newIngredient.emit(new Ingredient(form.value.ingredient, form.value.type, form.value.quantity));
  }
}
