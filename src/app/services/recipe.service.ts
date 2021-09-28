import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as ShoppingListActions from '../main/shopping-list/store/shopping-list.actions'

import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A test recipe',
  //     'This is test',
  //     'https://image.freepik.com/free-vector/worldwide-food-day-bowl-delicious-meal_23-2148291770.jpg',
  //     [
  //       new Ingredient('Test', 3),
  //       new Ingredient('test1', 2)
  //     ]),

  //   new Recipe(
  //     'A test recipe',
  //     'This is test',
  //     'https://image.freepik.com/free-vector/worldwide-food-day-bowl-delicious-meal_23-2148291770.jpg',
  //     [
  //       new Ingredient('Test', 3),
  //       new Ingredient('test1', 2)
  //     ])
  // ];
  private recipes: Recipe[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
    ) { }

  public setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }


  public getRecipes() {
    return this.recipes.slice();
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  public getRecipe(index: number) {
    return this.recipes[index];
  }

  public updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice())
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice())
  }

  public deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice())
  }
}
