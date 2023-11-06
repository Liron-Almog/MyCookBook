import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { UserDataService } from 'src/app/service/user-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  isLoading :boolean = false;
  isError: string = "";
  recipes;

  // Declare subscriptions as class properties
  private subscriptionLoading: Subscription;
  private subscriptionError: Subscription;
  private subscriptionData: Subscription;


  constructor(private userData: UserDataService) { }

  ngOnInit(): void {
    this.userData.initializeRecipeData();
    // Assign the subscriptions in ngOnInit
    this.subscriptionLoading = this.userData.isLoading.subscribe((value) => {
      this.isLoading = value;
    });
    this.subscriptionError = this.userData.isError.subscribe((value) => {
      this.isError = value;
    });
    this.subscriptionData = this.userData.recipes.subscribe((value) => {
      this.recipes = value;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions in ngOnDestroy
    this.subscriptionLoading.unsubscribe();
    this.subscriptionError.unsubscribe();
    this.subscriptionData.unsubscribe();
  }
}
