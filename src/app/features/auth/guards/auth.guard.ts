import { ActivatedRoute, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "../services/auth.service";
import { jwtDecode } from "jwt-decode";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const user = authService.getUser();

  // Check for the JWT Token
  let token = cookieService.get("Authorization");

  if (token && user) {
    token = token.replace("Bearer ", "");
    const decodedToken = jwtDecode(token);

    // Check if token has expired
    const expirationDate = decodedToken.exp! * 1000;
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
      return logoutUser(state, authService, router);
    } else {
      // Token is still valid
      if (user.roles.includes('Writer')) {
        return true;
      } else {
        return logoutUser(state, authService, router);
      }
    }
  } else {
    return logoutUser(state, authService, router);
  }
};

const logoutUser = (state: RouterStateSnapshot, authService: AuthService, router: Router) => {
  // Logout
  authService.logout();
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
