import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CompraMateriaPrimaService } from '../../services/compra-materia-prima';
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
export class DashboardComponent implements OnInit {
  isLoading = true;
  totalComprasUltimoMes: number = 0;
  comprasRecientes: any[] = [];
  comprasPorMes: any[] = [];

  constructor(private compraService: CompraMateriaPrimaService) {}

  ngOnInit(): void {
    this.cargarDatosDashboard();
  }

  cargarDatosDashboard(): void {
    this.compraService.getResumenCompras().subscribe({
      next: (resumen) => {
        this.totalComprasUltimoMes = resumen.totalUltimoMes;
        this.inicializarGraficoCompras(resumen.comprasPorMes);
      },
      error: (err) => console.error('Error cargando resumen:', err)
    });

    this.compraService.getComprasRecientes().subscribe({
      next: (compras) => {
        this.comprasRecientes = compras;
        this.isLoading = false;
      },
      error: (err) => console.error('Error cargando compras recientes:', err)
    });
  }

  inicializarGraficoCompras(datos: any[]): void {
    const ctx = document.getElementById('comprasChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: datos.map(item => item.mes),
        datasets: [{
          label: 'Compras por mes',
          data: datos.map(item => item.total),
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
  }
}