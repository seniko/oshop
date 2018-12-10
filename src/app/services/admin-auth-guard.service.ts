import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(user => this.userService.get(user.uid)),
      map((appUser: AppUser) => appUser.isAdmin))
  }
}
