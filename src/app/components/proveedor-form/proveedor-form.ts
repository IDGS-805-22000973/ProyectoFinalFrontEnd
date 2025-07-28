// components/proveedor-form/proveedor-form.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProveedoresService } from '../../services/proveedores';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { CrearProveedorRequest } from '../../interfaces/crear-proveedor';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-proveedor-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    CommonModule,
    MatDialogActions,
    MatDialogContent,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './proveedor-form.html',
  styleUrls: ['./proveedor-form.css']
})
export class ProveedorFormComponent {
  @Output() proveedorCreado = new EventEmitter<void>();
  form: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private proveedoresService: ProveedoresService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      empresa: [''],
      correo: ['', [Validators.email]],
      telefono: [''],
      direccion: ['']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isLoading = true;
    const proveedor: CrearProveedorRequest = this.form.value;

    this.proveedoresService.crearProveedor(proveedor).subscribe({
      next: (response) => {
        this.snackBar.open(response.mensaje, 'Cerrar', { duration: 3000 });
        this.form.reset();
        this.proveedorCreado.emit();
      },
      error: (err) => {
        console.error('Error al crear proveedor:', err);
        this.snackBar.open('Error al crear proveedor', 'Cerrar', { duration: 3000 });
      },
      complete: () => this.isLoading = false
    });
  }
}