import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

export const clienteGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const matSnackBar = inject(MatSnackBar);

  if (auth.isLoggedIn() && auth.getRole() === 'Cliente') {
    return true;
  }
  matSnackBar.open('No tienes acceso a esta página', 'Cerrar', {
    duration: 5000,
    horizontalPosition: 'center',
  });
  inject(Router).navigate(['/']);
  return false;
};