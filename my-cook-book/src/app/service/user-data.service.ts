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

  isError = new Subject<boolean>();
  isLoading = new Subject<boolean>();
  recipes = new Subject<any[]>(); // Use a more specific type than `[]`
  ingredients;

  constructor(private apiService: ApiService, private router: Router) {
    this.isError.next(false);
    this.isLoading.next(false);
    this.recipes.next(null);
  }

  deleteItem(pathAndParams: string) {
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
      }
    );
  }

  fetchRecipes() {
    this.isLoading.next(true);
    this.subscriptionRecipes = this.apiService.get('/recipes/get-items').subscribe(
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

  async getIngredientsByRecipeId(id: number) {
    
    this.isLoading.next(true);
    try {
      const data = await this.apiService.get('/ingredients/get-ingredient/' + id).toPromise();
      this.isLoading.next(false);
      return data;
    } 
    catch (error) {
      this.isLoading.next(false);
      this.isError.next(true);
    }
    
  }
  postNewRecipe(postData: any) {
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
        this.isError.next(true);
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
