import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ApiService } from 'src/app/service/api.service';
import { UserDataService } from 'src/app/service/user-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  isLoading = false;
  isError = false;
  recipes: Recipe[] = [];

  // Declare subscriptions as class properties
  private subscriptionLoading: Subscription;
  private subscriptionError: Subscription;
  private subscriptionData: Subscription;

  constructor(private apiService: ApiService, private userData: UserDataService) { }

  ngOnInit(): void {
    this.userData.initializeRecipeData();
    // Assign the subscriptions in ngOnInit
    this.subscriptionLoading = this.userData.isLoading.subscribe((value) => {
      this.isLoading = value;
      console.log('Received isLoading value:', value);
    });
    this.subscriptionError = this.userData.isError.subscribe((value) => {
      this.isError = value;
      console.log('Received isError value:', value);
    });
    this.subscriptionData = this.userData.recipes.subscribe((value) => {
      this.recipes = value;
      console.log('Received recipes value:', value);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions in ngOnDestroy
    this.subscriptionLoading.unsubscribe();
    this.subscriptionError.unsubscribe();
    this.subscriptionData.unsubscribe();
  }
}