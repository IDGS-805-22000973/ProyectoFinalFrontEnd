// components/proveedor-list/proveedor-list.ts
import { Component, Input } from '@angular/core';
import { ProveedoresService } from '../../services/proveedores';
import { ProveedorResponse } from '../../interfaces/proveedor-response';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProveedorEditDialog } from '../proveedor-edit-dialog/proveedor-edit-dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-proveedor-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './proveedor-list.html',
  styleUrls: ['./proveedor-list.css']
})
export class ProveedorList {
  @Input() refreshTrigger?: Observable<void>;
  proveedores: ProveedorResponse[] = [];
  isLoading = true;
  displayedColumns: string[] = ['nombre', 'empresa', 'correo', 'telefono', 'direccion', 'acciones'];

  constructor(private proveedoresService: ProveedoresService, private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadProveedores();
  }

  loadProveedores(): void {
    this.isLoading = true;
    this.proveedoresService.getAllProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar proveedores:', err);
        this.isLoading = false;
      }
    });
  }

  ngOnChanges() {
    if (this.refreshTrigger) {
      this.refreshTrigger.subscribe(() => this.loadProveedores());
    }
  }

  editarProveedor(proveedor: ProveedorResponse): void {
    const dialogRef = this.dialog.open(ProveedorEditDialog, {
      width: '600px',
      data: { proveedor }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProveedores(); // Recargar la lista si hubo cambios
      }
    });
  }

  eliminarProveedor(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar eliminación',
        message: '¿Estás seguro de eliminar este proveedor?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.proveedoresService.eliminarProveedor(id).subscribe({
          next: (response) => {
            this.snackBar.open(response.mensaje, 'Cerrar', {
              duration: 3000
            });
            this.loadProveedores(); // Recargar la lista
          },
          error: (err) => {
            console.error('Error al eliminar proveedor:', err);
            const mensaje = err.error?.mensaje || 'Error al eliminar proveedor';
            this.snackBar.open(mensaje, 'Cerrar', {
              duration: 5000
            });
          }
        });
      }
    });
  }

}