import { Component } from '@angular/core';
import { Recipe } from 'src/app/my-list/recipe.model';
import { UserDataService } from 'src/app/service/user-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  colNames:string[] = ['#','Recipe Name','Preparation Time','Servings','Delete'];
  isLoading:boolean = false;
  error: string = "";
  recipes = [];

  // Declare subscriptions as class properties
  private subscriptionLoading: Subscription;
  private subscriptionError: Subscription;
  private subscriptionData: Subscription;

  constructor(private userData: UserDataService) { }

  onDeleteClick(event:any) :void{
    this.userData.deleteItem("/recipes/delete-item/"+ event.target.id);
  }

  ngOnInit(): void {
    this.userData.initializeRecipeData();  
    // Assign the subscriptions in ngOnInit
    this.subscriptionLoading = this.userData.isLoading.subscribe((value) => {
      this.isLoading = value;
    });

    this.subscriptionError = this.userData.isError.subscribe((value) => {
      this.error = value;
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
