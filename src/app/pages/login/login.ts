import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginRequest } from '../../interfaces/login-request'; // Asegúrate de que la ruta sea correcta
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: Auth, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loginData = this.loginForm.value as LoginRequest;

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.isLoading = false;

        const userRole = this.authService.getRole();

        if (userRole === 'admin') {
          this.router.navigate(['/dashboard']);
        } else if (userRole === 'Cliente') {
          this.router.navigate(['/cliente']);
        } else {

          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.mensaje || 'Error en el inicio de sesión';
      }
    });
  }
}
