import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './main/header/header.component';
import { MainLayoutComponent } from './main/main-layout/main-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthComponent } from './main/auth/auth.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { RecipesModule } from './main/recipes/recipes.module';
import { RecipesRoutingModule } from './main/recipes/recipes-routing.module';
import { ShoppingListModule } from './main/shopping-list/shopping-list.module';
import { LoadingSpinnerComponent } from './common/loading-spinner/loading-spinner.component';
import { AlertComponent } from './common/alert/alert.component';
import { DropdownDirective } from './utils/dropdown.directive';
import { UtilsModule } from './utils/utils.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainLayoutComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule,
    RecipesRoutingModule,
    ShoppingListModule,
    UtilsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
