import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = new BehaviorSubject<User | null>(null);
  private _baseUrl = `${environment.baseUrl}/auth`;
  private readonly loggedInUserKey = 'loggedInUser';

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem(this.loggedInUserKey);

    if (user) {
      this._currentUser.next(JSON.parse(user));
    }
    this.sessionInfo().subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.handleLogout();
      }
    })
  }

  sessionInfo() {
    return this.http.get<{ isLoggedIn: boolean }>(`${this._baseUrl}/sessionInfo`).pipe(
      tap(sessionInfo => sessionInfo.isLoggedIn)
    )
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${this._baseUrl}/login`, { email, password }).pipe(
      tap(user => {
        this.storeUserAfterLogin(user);
        this._currentUser.next(user);
      })
    );
  }

  registration(email: string, password: string): Observable<User> {
    const data = {email, password}
    console.log(data)
    return this.http.post<User>(`${this._baseUrl}/registration`, data)
    
    }
  

  logout() {
    return this.http.post(`${this._baseUrl}/logout`, null).pipe(
      tap(_ => {
        this.handleLogout();

      })
    );
  }

  isLoggedIn() {
    return this._currentUser.getValue() !== null;
  }

  get currentUser() {
    return this._currentUser.asObservable();
  }

  private handleLogout() {
    this.clearLocalStorage();
    this._currentUser.next(null);
    this.router.navigateByUrl('/login');
  }

  private storeUserAfterLogin(user: User) {
    localStorage.setItem(this.loggedInUserKey, JSON.stringify(user));
  }

  private clearLocalStorage() {
    localStorage.removeItem(this.loggedInUserKey);
  }
}
