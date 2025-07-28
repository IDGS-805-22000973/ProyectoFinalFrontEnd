import { Component, Input } from '@angular/core';
import { MateriaPrimaService } from '../../services/materia-prima';
import { MateriaPrimaResponse } from '../../interfaces/materia-prima-response';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MateriaEditDialog } from '../materia-edit-dialog/materia-edit-dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';


@Component({
  selector: 'app-materia-prima-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,

  ],
  templateUrl: './materia-prima-list.html',
  styleUrls: ['./materia-prima-list.css']
})
export class MateriaPrimaListComponent {
  @Input() refreshTrigger?: Observable<void>;
  materiasPrimas: MateriaPrimaResponse[] = [];
  isLoading = true;
  displayedColumns: string[] = ['nombre', 'unidad', 'existencia', 'costoPromedio', 'porcentajeGanancia', 'acciones'];

  constructor(
    private materiaPrimaService: MateriaPrimaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadMateriasPrimas();
  }

  loadMateriasPrimas(): void {
    this.isLoading = true;
    this.materiaPrimaService.getAllMateriasPrimas().subscribe({
      next: (data) => {
        this.materiasPrimas = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar materias primas:', err);
        this.isLoading = false;
      }
    });
  }

  ngOnChanges() {
    if (this.refreshTrigger) {
      this.refreshTrigger.subscribe(() => this.loadMateriasPrimas());
    }
  }

  editarMateria(materia: MateriaPrimaResponse): void {
    const dialogRef = this.dialog.open(MateriaEditDialog, {
      width: '500px',
      data: { materia }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.actualizarMateria(materia.id, result);
      }
    });
  }

  private actualizarMateria(id: number, data: any): void {
    this.materiaPrimaService.actualizarMateriaPrima(id, data).subscribe({
      next: () => {
        this.snackBar.open('Materia prima actualizada', 'Cerrar', { duration: 3000 });
        this.loadMateriasPrimas(); // Recargar la lista
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        this.snackBar.open(err.error?.mensaje || 'Error al actualizar', 'Cerrar', { duration: 3000 });
      }
    });
  }

  eliminarMateria(materia: MateriaPrimaResponse): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de que deseas eliminar "${materia.nombre}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.materiaPrimaService.eliminarMateriaPrima(materia.id).subscribe({
          next: () => {
            this.snackBar.open('Materia prima eliminada', 'Cerrar', { duration: 3000 });
            this.loadMateriasPrimas(); // Recargar la lista
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            this.snackBar.open(err.error?.mensaje || 'Error al eliminar', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

}