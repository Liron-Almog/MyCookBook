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


  public START_STEP = 1;
  public MAXIMUM_STEP = 2;
  step:number = 1;
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

  onNext(){
   

    if(this.MAXIMUM_STEP > this.step)
        this.step++;
  }
  onBack(){
  
    if(this.START_STEP < this.step)
        this.step--;

  }
  onSubmit(form:NgForm){
    console.log(form.value);
    
    this.userData.postNewRecipe(form.value,this.ingredientsArray);
  }

  addIngredient(newIngredient: Ingredient) {
    this.ingredientsArray.push(newIngredient); 
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions in ngOnDestroy
    this.subscriptionLoading.unsubscribe();
    this.subscriptionError.unsubscribe();
  }

}



 