import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CotizacionList } from '../../components/cotizacion-list/cotizacion-list';

@Component({
  selector: 'app-admin-cotizacion-list',
  standalone: true,
  imports: [CommonModule, CotizacionList],
  templateUrl: './admin-cotizacion-list.html',
  styleUrl: './admin-cotizacion-list.css'
})
export class AdminCotizacionList {
  // Puedes añadir lógica adicional específica para el admin aquí si es necesario
}