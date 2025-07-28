// components/materia-edit-dialog/materia-edit-dialog.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MateriaPrimaRequest } from '../../interfaces/materia-prima-request';
import { MateriaPrimaResponse } from '../../interfaces/materia-prima-response';


@Component({
  selector: 'app-materia-edit-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatDialogActions,
    MatDialogModule
  ],
  templateUrl: './materia-edit-dialog.html',
  styleUrls: ['./materia-edit-dialog.css']
})
export class MateriaEditDialog {
  editForm: FormGroup;
  unidades = ['piezas'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MateriaEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { materia: MateriaPrimaResponse }
  ) {
    this.editForm = this.fb.group({
      nombre: [data.materia.nombre, [Validators.required, Validators.minLength(3)]],
      unidad: [data.materia.unidad, [Validators.required]],
      porcentajeGanancia: [data.materia.porcentajeGanancia, [Validators.required, Validators.min(0)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}