import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClienteService } from '../../services/cliente';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil {
  usuario: any = null;
  mostrarFormularioNombre = false;
  mostrarFormularioEmail = false;
  mostrarFormularioPassword = false;

  nuevoNombre = '';
  nuevoEmail = '';
  passwordActual = '';
  nuevoPassword = '';

  constructor(private clienteService: ClienteService, private snackBar: MatSnackBar) {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.clienteService.obtenerPerfil().subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.nuevoNombre = usuario.nombre;
        this.nuevoEmail = usuario.email;
      },
      error: (err) => console.error('Error al cargar perfil', err)
    });
  }

  actualizarNombre(): void {
    this.clienteService.actualizarNombre(this.nuevoNombre).subscribe({
      next: () => {
        if (this.usuario) this.usuario.nombre = this.nuevoNombre;
        this.mostrarFormularioNombre = false;
        this.snackBar.open('Nombre actualizado correctamente', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
      error: (err) => {
        console.error('Error al actualizar nombre', err);
        this.snackBar.open('Error al actualizar nombre', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar'] // Opcional: estilo para errores
        });
      }
    });
  }

  actualizarEmail(): void {
    this.clienteService.actualizarEmail(this.nuevoEmail).subscribe({
      next: () => {
        if (this.usuario) this.usuario.email = this.nuevoEmail;
        this.mostrarFormularioEmail = false;
        this.snackBar.open('Email actualizado correctamente', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
      error: (err) => {
        console.error('Error al actualizar email', err);
        this.snackBar.open('Error al actualizar email', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  cambiarPassword(): void {
    this.clienteService.cambiarPassword(this.passwordActual, this.nuevoPassword).subscribe({
      next: () => {
        this.passwordActual = '';
        this.nuevoPassword = '';
        this.mostrarFormularioPassword = false;
        this.snackBar.open('Contraseña cambiada correctamente', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
      error: (err) => {
        console.error('Error al cambiar contraseña', err);
        this.snackBar.open('Error al cambiar contraseña', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}