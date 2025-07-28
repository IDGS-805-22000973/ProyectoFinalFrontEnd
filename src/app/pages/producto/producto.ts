import { Component } from '@angular/core';
import { ProductoListComponent } from '../../components/producto-list/producto-list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductoFormComponent } from '../../components/producto-form/producto-form';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    CommonModule,
    ProductoListComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './producto.html',
  styleUrls: ['./producto.css']
})
export class ProductoComponent {
  constructor(private dialog: MatDialog) {}

  abrirFormularioProducto(): void {
    const dialogRef = this.dialog.open(ProductoFormComponent, {
      width: '800px'
    });

    dialogRef.componentInstance.productoCreado.subscribe(() => {
      dialogRef.close();
    });
  }
}