import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CompraMateriaPrimaService } from '../../services/compra-materia-prima';
import { DashboardVentasService } from '../../services/dashboard-ventas-service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  isLoading = true;
  // Datos de compras
  totalComprasUltimoMes: number = 0;
  comprasRecientes: any[] = [];
  comprasPorMes: any[] = [];
  
  // Datos de ventas
  totalVentasMes: number = 0;
  totalVentasAnio: number = 0;
  ventasHoy: number = 0;
  promedioVenta: number = 0;

  private chartInstance: Chart | null = null;
  private retryCount = 0;
  private readonly maxRetries = 5;

  constructor(
    private compraService: CompraMateriaPrimaService,
    private ventasService: DashboardVentasService
  ) {}

  ngOnInit(): void {
    this.cargarDatosDashboard();
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  cargarDatosDashboard(): void {
    this.compraService.getResumenCompras().subscribe({
      next: (resumen) => {
        this.totalComprasUltimoMes = resumen.totalUltimoMes;
        this.comprasPorMes = resumen.comprasPorMes;
        this.initializeChartWithRetry();
      },
      error: (err) => console.error('Error cargando resumen de compras:', err)
    });

    this.compraService.getComprasRecientes().subscribe({
      next: (compras) => {
        this.comprasRecientes = compras;
      },
      error: (err) => console.error('Error cargando compras recientes:', err)
    });

    this.ventasService.getResumenVentas().subscribe({
      next: (resumen) => {
        this.totalVentasMes = resumen.totalVentasMes;
        this.totalVentasAnio = resumen.totalVentasAnio;
        this.ventasHoy = resumen.ventasHoy;
        this.promedioVenta = resumen.promedioVenta;
        this.isLoading = false;
      },
      error: (err) => console.error('Error cargando resumen de ventas:', err)
    });
  }

  private initializeChartWithRetry(): void {
    this.destroyChart();
    this.retryCount = 0;
    this.tryInitializeChart();
  }

  private tryInitializeChart(): void {
    const canvas = document.getElementById('comprasChart') as HTMLCanvasElement;
    
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.comprasPorMes.map(item => item.mes),
            datasets: [{
              label: 'Compras por mes',
              data: this.comprasPorMes.map(item => item.total),
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Total ($)'
                }
              }
            }
          }
        });
        return;
      }
    }

    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      setTimeout(() => this.tryInitializeChart(), 100 * this.retryCount);
    } else {
      console.error('No se pudo inicializar el gráfico después de varios intentos');
    }
  }

  private destroyChart(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }
}