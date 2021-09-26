/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub!: Subscription;
  isAuthenticated: boolean = false;


  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      user => {
        // console.log(user)
        this.isAuthenticated = !user ? false : true
      }
    );
    console.log(this.isAuthenticated)
  }

  onSaveData() {
    this.dataStorageService.stroreRecipes();
  }

  onFetchedData() {
    this.dataStorageService.fetchedRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
