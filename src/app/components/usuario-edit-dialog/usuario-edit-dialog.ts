// components/usuario-edit-dialog/usuario-edit-dialog.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UsuarioResponse } from '../../interfaces/usuario-response';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuario-edit-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatIconModule
  ],
  templateUrl: './usuario-edit-dialog.html',
  styleUrls: ['./usuario-edit-dialog.css']
})
export class UsuarioEditDialog {
  editForm: FormGroup;
  roles = ['Admin', 'Cliente'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UsuarioEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { usuario: UsuarioResponse }
  ) {
    this.editForm = this.fb.group({
      nombre: [data.usuario.nombre, [Validators.required, Validators.minLength(3)]],
      email: [data.usuario.email, [Validators.required, Validators.email]],
      rol: [data.usuario.roles[0], Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}