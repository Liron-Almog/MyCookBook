import { Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from './ingredient.model';
import { UserDataService } from '../service/user-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnDestroy, OnInit{

  isLoading = false;
  isError = false;
  ingredientsArray:Ingredient[] = []

  // Declare subscriptions as class properties
  private subscriptionLoading: Subscription;
  private subscriptionError: Subscription;

  constructor(private userData: UserDataService){}


  ngOnInit(): void {
    this.userData.initializeRecipeData();
    // Assign the subscriptions in ngOnInit
    this.subscriptionLoading = this.userData.isLoading.subscribe((value) => {
      this.isLoading = value;
    });
    this.subscriptionError = this.userData.isError.subscribe((value) => {
      this.isError = value;
    });
  }

  onSubmit(form:NgForm){
    //this.userData.postRecipe(form.value);
    this.userData.postIngredient(this.ingredientsArray);
    console.log(form.value);
  }

  addIngredient(newIngredient: Ingredient) {
    this.ingredientsArray.push(newIngredient); 
  }
  onResetIngredients(){
    this.ingredientsArray = []
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions in ngOnDestroy
    this.subscriptionLoading.unsubscribe();
    this.subscriptionError.unsubscribe();
  }

}



 