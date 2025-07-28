import { Component, Input } from '@angular/core';
import { CompraMateriaPrimaService } from '../../services/compra-materia-prima';
import { CompraDto } from '../../interfaces/compra-dto';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-compra-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './compra-list.html',
  styleUrls: ['./compra-list.css']
})
export class CompraListComponent {
  @Input() refreshTrigger?: Observable<void>;
  compras: CompraDto[] = [];
  isLoading = true;
  displayedColumns: string[] = ['id', 'fechaCompra', 'proveedorNombre', 'total', 'acciones'];

  constructor(
    private compraService: CompraMateriaPrimaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCompras();
  }

  loadCompras(): void {
    this.isLoading = true;
    this.compraService.getCompras().subscribe({
      next: (data) => {
        this.compras = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar compras:', err);
        this.isLoading = false;
        this.snackBar.open('Error al cargar compras', 'Cerrar', { duration: 3000 });
      }
    });
  }

  ngOnChanges() {
    if (this.refreshTrigger) {
      this.refreshTrigger.subscribe(() => this.loadCompras());
    }
  }
}