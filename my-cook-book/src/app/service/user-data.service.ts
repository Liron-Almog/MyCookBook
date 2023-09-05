
import {Injectable, OnDestroy} from '@angular/core'
import { ApiService } from './api.service';
import { Subject ,Subscription} from 'rxjs';
import { Ingredient } from '../create-list/ingredient.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Injectable({providedIn:"root"})
export class UserDataService implements OnDestroy{

    subscriptionPost:Subscription;
    subscriptionDelete:Subscription;
    subscription:Subscription;

    subscriptionPostIng:Subscription;
    isError = new Subject<boolean>();
    isLoading = new Subject<boolean>();
    recipes = new Subject<[]>();
    ingredients = new Subject<Ingredient[]>();

    
    constructor(private apiService:ApiService,private router:Router){
        this.isError.next(false); 
        this.isLoading.next(false);
        this.recipes.next(null)
    }

    deleteItem(pathAndParams:string){

      this.isLoading.next(true);
        this.subscriptionDelete = this.apiService.delete(pathAndParams).subscribe(
          () => {
            this.isLoading.next(false);
            this.fetchRecipes();
          },
          (error) => {
          
            
            // Error case
            this.isLoading.next(false);
            this.isError.next(true);
            console.error('An error occurred:', error);
          }
        );
    }

    postIngredient(ingredientsArray:Ingredient[]){
      
      if(ingredientsArray.length === 0){
        this.router.navigate(['/my-list']);
        return;
      }
   
      this.isLoading.next(true);
        this.subscriptionPostIng = this.apiService.post('/ingredients/add',ingredientsArray).subscribe(
          () => {
   
            // Success case
            this.isLoading.next(false);
       
        
            this.router.navigate(['/my-list']);
          },
          (error) => {
            // Error case
            this.isLoading.next(false);
            this.isError.next(true);
            this.router.navigate(['/create-recipe']);
          }
        );
    }

  
    fetchRecipes(){

        this.isLoading.next(true);
        this.subscription = this.apiService.get('/recipes/get-items').subscribe(
          (data) => {
            this.isLoading.next(false);
            this.recipes.next(data);
          },
          (error) => {
            // Error case
            this.isLoading.next(false);
            this.isError.next(true);
            console.error('An error occurred:', error);
          }
        );
    }
    fetchIngredientsByRecipeId(id:number){  

      this.isLoading.next(true);
      this.subscription = this.apiService.get('/ingredients/get-ingredient:'+ id).subscribe(
        (data) => {
          // Success case
          this.isLoading.next(false);
          this.ingredients.next(data);
          console.log(data);


        },
        (error) => {
          // Error case
          this.isLoading.next(false);
          this.isError.next(true);
          console.error('An error occurred:', error);
        }
      );
  }
  postNewRecipe(postData:any){

      this.subscriptionPost = this.apiService.post('/recipes/add-recipe',postData).subscribe(
        (data) => {
          // Success case
          this.isLoading.next(false);
          this.fetchRecipes();
        },
        (error) => {
          // Error case
          this.isLoading.next(false);
          this.isError.next(true);
        }
    );

    }
    initializeRecipeData() {

      this.fetchRecipes()

    }
      ngOnDestroy() {
        this.subscriptionPostIng.unsubscribe();
        this.subscriptionPost.unsubscribe();
        this.subscription.unsubscribe();
        this.subscriptionDelete.unsubscribe();
      }
      
}

