import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CotizacionService } from '../../services/cotizacion';
import { CotizacionResponse } from '../../interfaces/cotizacion-model';

@Component({
  selector: 'app-cotizacion-list',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './cotizacion-list.html',
  styleUrl: './cotizacion-list.css'
})
export class CotizacionList implements OnInit {
  cotizaciones: CotizacionResponse[] = [];
  isLoading = true;

  constructor(
    private cotizacionService: CotizacionService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.cargarCotizaciones();
  }

  cargarCotizaciones() {
    this.cotizacionService.obtenerTodasLasCotizaciones().subscribe({
      next: (data: CotizacionResponse[]) => {
        this.cotizaciones = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar cotizaciones:', error);
        this.isLoading = false;
      }
    });
  }

  formatFecha(fecha: string): string | null {
    return this.datePipe.transform(fecha, 'yyyy-MM-dd');
  }

  calcularEstado(cotizacion: CotizacionResponse): string {
    // Implementa tu lógica de estado aquí si es necesario
    // Por ahora devolvemos 'Pendiente' como valor por defecto
    return 'Pendiente';
  }
}