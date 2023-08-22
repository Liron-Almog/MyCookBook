import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit{

  isLoading = false;
  isError = false;

  constructor(private apiService:ApiService){}
  
  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.get(`/recipes/get-items`).subscribe(data => {
      console.log(data)
      this.isLoading = false;
    })
    
  }


}
