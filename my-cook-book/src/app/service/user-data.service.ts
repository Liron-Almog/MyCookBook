
import {Injectable, OnDestroy} from '@angular/core'
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Subject ,Subscription} from 'rxjs';
import { Recipe } from '../my-list/recipe.model';
@Injectable({providedIn:"root"})
export class UserDataService implements OnDestroy{


    subscription:Subscription;
    isError = new Subject<boolean>();
    isLoading = new Subject<boolean>();
    recipes = new Subject<Recipe[]>();

    constructor(private apiService:ApiService){
        this.isError.next(false); 
        this.isLoading.next(false);
        this.recipes.next(null)
    }

    fetchRecipes(){
        this.isLoading.next(true);
        this.subscription = this.apiService.get('/recipes/get-items').subscribe(
          (data) => {
            // Success case
            this.isLoading.next(false);
            this.recipes.next(data);
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
    initializeRecipeData() {

        this.fetchRecipes()

    }
      ngOnDestroy() {
        this.subscription.unsubscribe();
      }
      
}