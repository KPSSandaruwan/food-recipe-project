import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../common/config';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';
import { map, take, tap } from 'rxjs/operators'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  public stroreRecipes() {
    const recipes = this.recipeService.getRecipes();
    const ep = AppConfig.apiUrl(`recipes.json`);
    this.httpClient.put<any>(ep, recipes).subscribe(response => console.log(response));
  }

  public fetchedRecipes() {
    
    const ep = AppConfig.apiUrl(`recipes.json`);
    return this.httpClient.get<Recipe[]>(ep)
    .pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    )
  }

}
