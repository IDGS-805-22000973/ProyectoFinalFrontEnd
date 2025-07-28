import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CompraDto } from '../interfaces/compra-dto';
import { CrearCompraDto } from '../interfaces/crear-compra-dto';

@Injectable({
  providedIn: 'root'
})
export class CompraMateriaPrimaService {
  private apiUrl = `${environment.apiUrl}Compras`;

  constructor(private http: HttpClient) { }

  getCompras(): Observable<CompraDto[]> {
    return this.http.get<CompraDto[]>(this.apiUrl);
  }

  crearCompra(compra: CrearCompraDto): Observable<any> {
    return this.http.post(this.apiUrl, compra);
  }

  // Nuevos métodos para el dashboard
  getResumenCompras(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resumen`);
  }

  getComprasRecientes(): Observable<CompraDto[]> {
    return this.http.get<CompraDto[]>(`${this.apiUrl}/recientes`);
  }

  getComprasPorMes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/por-mes`);
  }
}