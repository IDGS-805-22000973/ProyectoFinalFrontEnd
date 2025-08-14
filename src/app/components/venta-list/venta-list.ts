import { Component, Input, OnInit } from '@angular/core';
import { VentaService } from '../../services/venta';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { VentaAdminDto } from '../../interfaces/venta';
import { OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-venta-list',
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
  templateUrl: './venta-list.html',
  styleUrls: ['./venta-list.css']
})
export class VentaListComponent implements OnInit {
  @Input() refreshTrigger?: Observable<void>;
  private refreshSubscription?: Subscription;
  ventas: VentaAdminDto[] = [];
  isLoading = true;
  displayedColumns: string[] = ['fecha', 'cliente', 'producto', 'cantidad', 'precio', 'total', 'estado', 'creadoPor', 'acciones'];

  constructor(
    private ventaService: VentaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas(): void {
    this.isLoading = true;
    this.ventaService.getVentas().subscribe({
      next: (data) => {
        this.ventas = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar ventas:', err);
        this.isLoading = false;
        this.snackBar.open('Error al cargar ventas', 'Cerrar', { duration: 3000 });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Verificamos si la propiedad 'refreshTrigger' ha cambiado
    if (changes['refreshTrigger'] && this.refreshTrigger) {
      
      // 1. Si ya existe una suscripción anterior, la cancelamos para evitar fugas
      if (this.refreshSubscription) {
        this.refreshSubscription.unsubscribe();
      }
      
      // 2. Creamos la nueva suscripción y la guardamos
      this.refreshSubscription = this.refreshTrigger.subscribe(() => {
        console.log('Refresh triggered!'); // Para depurar
        this.cargarVentas();
      });
    }
  }

  ngOnDestroy(): void {
    // 3. Es crucial cancelar la suscripción cuando el componente se destruye
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}