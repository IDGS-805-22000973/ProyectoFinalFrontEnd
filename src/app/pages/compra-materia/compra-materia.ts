import { Component } from '@angular/core';
import { CompraListComponent } from '../../components/compra-list/compra-list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CompraFormComponent } from '../../components/compra-form/compra-form';

@Component({
  selector: 'app-compra-materia',
  standalone: true,
  imports: [
    CommonModule,
    CompraListComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './compra-materia.html',
  styleUrls: ['./compra-materia.css']
})
export class CompraMateria {
  constructor(private dialog: MatDialog) {}

  abrirFormularioCompra(): void {
    const dialogRef = this.dialog.open(CompraFormComponent, {
      width: '800px'
    });

    dialogRef.componentInstance.compraCreada.subscribe(() => {
      dialogRef.close();
    });
  }
}