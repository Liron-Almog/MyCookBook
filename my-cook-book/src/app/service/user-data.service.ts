import { Injectable, OnDestroy } from '@angular/core';
import { ApiService } from './api.service';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserDataService implements OnDestroy {

  subscriptionPost: Subscription;
  subscriptionDelete: Subscription;
  subscriptionRecipes:Subscription;
  subscriptionIngredients: Subscription;
  subscriptionPostIng: Subscription; // Make sure to define this subscription

  isLoadingIngredients = new Subject<boolean>();
  isError = new Subject<string>();
  isLoading = new Subject<boolean>();
  recipes = new Subject<any[]>(); 
  ingredients:any;

  constructor(private apiService: ApiService, private router: Router) {
    this.isError.next("");
    this.isLoading.next(false);
    this.recipes.next(null);
  }

  deleteItem(pathAndParams: string) {
    this.isLoading.next(true);
    this.isError.next("");
    this.subscriptionDelete = this.apiService.delete(pathAndParams).subscribe(
      () => {
        this.isLoading.next(false);
        this.fetchRecipes();
      },
      (error) => {         
        this.isLoading.next(false);      
        this.isError.next(error.error);
      }
    );
  }

  fetchRecipes() {
    this.isLoading.next(true);
    this.isError.next("");
    this.subscriptionRecipes = this.apiService.get('/recipes/get-items').subscribe(
      (data) => {
        this.isLoading.next(false);
        this.recipes.next(data);
      },
      (error) => { 
        this.isLoading.next(false);
        this.isError.next(error.error);
      }
    );
  }

  async getIngredientsByRecipeId(id: number) {
    
    this.isLoadingIngredients.next(true);
    this.isError.next("");
    try {
      const data = await this.apiService.get('/ingredients/get-ingredient/' + id).toPromise();
      this.isLoadingIngredients.next(false);
      return data;
    } 
    catch (error) {
      this.isLoadingIngredients.next(false);
      this.isError.next(error.error);
    }
    
  }
  postNewRecipe(postData: any) {
    this.isError.next("");
    this.subscriptionPost = this.apiService.post('/recipes/add-recipe', postData).subscribe(
      (data) => {
        // Success case
        this.isLoading.next(false);
        this.fetchRecipes();
        this.router.navigate(['/my-list']);
      },
      (error) => {
        // Error case
        this.isLoading.next(false);
        this.isError.next(error.error);
      }
    );
  }

  initializeRecipeData() {
    this.fetchRecipes();
  }

  ngOnDestroy() {
    if (this.subscriptionPostIng) {
      this.subscriptionPostIng.unsubscribe();
    }
    if (this.subscriptionRecipes) {
      this.subscriptionRecipes.unsubscribe();
    }

    if (this.subscriptionPost) {
      this.subscriptionPost.unsubscribe();
    }
    if (this.subscriptionIngredients) {
      this.subscriptionIngredients.unsubscribe();
    }
    if (this.subscriptionDelete) {
      this.subscriptionDelete.unsubscribe();
    }
  }
}
