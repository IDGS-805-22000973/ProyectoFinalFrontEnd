// guards/admin.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const matSnackBar = inject(MatSnackBar);

  if (auth.isLoggedIn() && auth.getRole() === 'admin') {
    return true;
  }
  matSnackBar.open('No tienes acceso a esta pagina', 'Cerrar', {
    duration: 5000,
    horizontalPosition: 'center',
  });
  inject(Router).navigate(['/']);
  return false;
};