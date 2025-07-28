// components/materia-prima-form/materia-prima-form.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MateriaPrimaService } from '../../services/materia-prima';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MateriaPrimaRequest } from '../../interfaces/materia-prima-request';

@Component({
  selector: 'app-materia-prima-form',
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
  templateUrl: './materia-prima-form.html',
  styleUrls: ['./materia-prima-form.css']
})
export class MateriaPrimaFormComponent {
  @Output() materiaCreada = new EventEmitter<void>();
  form: FormGroup;
  unidades = ['piezas'];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private materiaPrimaService: MateriaPrimaService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      unidad: ['pieza', [Validators.required]], // Valor por defecto 'pieza'
      porcentajeGanancia: [30, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isLoading = true;
    const materia: MateriaPrimaRequest = this.form.value;

    this.materiaPrimaService.crearMateriaPrima(materia).subscribe({
      next: (response) => {
        this.snackBar.open('Materia prima creada correctamente', 'Cerrar', { duration: 3000 });
        this.form.reset({
          unidad: 'pieza',
          porcentajeGanancia: 30
        });
        this.materiaCreada.emit();
      },
      error: (err) => {
        console.error('Error al crear materia prima:', err);
        this.snackBar.open(err.error?.mensaje || 'Error al crear materia prima', 'Cerrar', { duration: 3000 });
      },
      complete: () => this.isLoading = false
    });
  }
}