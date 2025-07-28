// components/proveedor-edit-dialog/proveedor-edit-dialog.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProveedorResponse } from '../../interfaces/proveedor-response';
import { ProveedoresService } from '../../services/proveedores';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-proveedor-edit-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatSnackBarModule,
    MatDialogActions,
    MatDialogContent
  ],
  templateUrl: './proveedor-edit-dialog.html',
  styleUrls: ['./proveedor-edit-dialog.css']
})


export class ProveedorEditDialog {
  editForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProveedorEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { proveedor: ProveedorResponse },
    private proveedoresService: ProveedoresService,
    private snackBar: MatSnackBar
  ) {
    this.editForm = this.fb.group({
      nombre: [data.proveedor.nombre, [Validators.required, Validators.minLength(3)]],
      empresa: [data.proveedor.empresa || ''],
      correo: [data.proveedor.correo || '', [Validators.email]],
      telefono: [data.proveedor.telefono || ''],
      direccion: [data.proveedor.direccion || '']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.editForm.invalid) return;

    this.isLoading = true;
    const proveedorData = this.editForm.value;

    this.proveedoresService.actualizarProveedor(this.data.proveedor.id, proveedorData).subscribe({
      next: (response) => {
        this.snackBar.open(response.mensaje, 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true); // Indica que la edición fue exitosa
      },
      error: (err) => {
        console.error('Error al actualizar proveedor:', err);
        this.snackBar.open('Error al actualizar proveedor', 'Cerrar', { duration: 3000 });
      },
      complete: () => this.isLoading = false
    });
  }
}