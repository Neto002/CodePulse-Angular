import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { LoginRequest } from "../models/login-request.model";
import { BehaviorSubject, Observable } from "rxjs";
import { LoginResponse } from "../models/login-response.model";
import { User } from "../models/user.model";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  private authEndpointUrl: string = `${environment.apiBaseUrl}/auth`

  constructor(private http: HttpClient,
              private cookieService: CookieService,) {
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authEndpointUrl}/login`, request);
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete("Authorization", '/');
    this.$user.next(undefined);
  }

  setUser(user: User): void {
    // Emiting new value of User to any subscribers
    this.$user.next(user);

    localStorage.setItem("user-email", user.email);
    localStorage.setItem("user-roles", user.roles.join(","));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem("user-email");
    const roles = localStorage.getItem("user-roles");

    if (email && roles) {
      return {
        email: email,
        roles: roles.split(",")
      };
    }

    return undefined;
  }
}
