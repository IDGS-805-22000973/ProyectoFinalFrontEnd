// components/user-form/user-form.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { CrearUsuarioRequest } from '../../interfaces/crear-usuario';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    CommonModule
  ],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css']
})
export class UserForm {
  @Output() usuarioCreado = new EventEmitter<void>();
  form: FormGroup;
  roles = ['admin', 'Cliente'];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar
  ) {
    // components/user-form/user-form.ts
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[A-Z]/),    // Al menos una mayúscula
        Validators.pattern(/[a-z]/),    // Al menos una minúscula
        Validators.pattern(/[0-9]/),    // Al menos un número
        Validators.pattern(/[!@#$%^&*]/) // Al menos un carácter especial
      ]],
      rol: ['Cliente', Validators.required]
    });
  }

  // components/user-form/user-form.ts
  onSubmit(): void {
    if (this.form.invalid) return;

    this.isLoading = true;
    const usuario: CrearUsuarioRequest = this.form.value;
    console.log('Enviando usuario:', usuario); // Debug

    this.usuariosService.crearUsuario(usuario).subscribe({
      next: (response) => {
        this.snackBar.open(response.mensaje, 'Cerrar', { duration: 5000 });
        this.form.reset({ rol: 'Cliente' });
        this.usuarioCreado.emit();
      },
      error: (err) => {
        console.error('Error completo:', err); // Debug detallado
        const mensaje = err.error?.mensaje ||
          err.error?.errores?.join(', ') ||
          'Error al crear usuario';
        this.snackBar.open(mensaje, 'Cerrar', { duration: 7000 });
      },
      complete: () => this.isLoading = false
    });
  }
}