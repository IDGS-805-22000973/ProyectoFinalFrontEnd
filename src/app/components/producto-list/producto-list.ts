import { Component, OnInit, inject } from '@angular/core';
import { ProductoService } from '../../services/producto';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ProductoResponse } from '../../interfaces/producto';
import { ProductoEditDialog } from '../producto-edit-dialog/producto-edit-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './producto-list.html',
  styleUrls: ['./producto-list.css']
})
export class ProductoListComponent implements OnInit {
  productos: ProductoResponse[] = [];
  isLoading = true;
  displayedColumns: string[] = ['nombre', 'descripcion', 'precioVenta', 'componentes', 'acciones'];

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.isLoading = false;
      }
    });
  }

  editarProducto(productoId: number): void {
    const dialogRef = this.dialog.open(ProductoEditDialog, {
      width: '800px',
      data: { productoId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarProductos(); // Cambiado de loadProductos() a cargarProductos()
      }
    });
  }

  eliminarProducto(productoId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Estás seguro de que deseas eliminar este producto?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productoService.eliminarProducto(productoId).subscribe({
          next: () => {
            this.snackBar.open('Producto eliminado correctamente', 'Cerrar', { duration: 3000 });
            this.cargarProductos(); // Recargar la lista
          },
          error: (err) => {
            console.error('Error al eliminar producto:', err);
            this.snackBar.open(err.error?.mensaje || 'Error al eliminar producto', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }
}