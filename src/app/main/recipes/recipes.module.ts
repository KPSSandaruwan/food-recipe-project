import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppModule } from "src/app/app.module";
import { UtilsModule } from "src/app/utils/utils.module";
import { EditRecipeComponent } from "./edit-recipe/edit-recipe.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    EditRecipeComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    UtilsModule
  ],
})
export class RecipesModule {}
