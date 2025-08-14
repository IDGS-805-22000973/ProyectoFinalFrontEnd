import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CrearCotizacionDto } from '../interfaces/cotizacion-model';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private apiUrl = `${environment.apiUrl}Cotizaciones`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Método para crear una cotización
  crearCotizacion(cotizacion: CrearCotizacionDto): Observable<any> {
    return this.http.post(this.apiUrl, cotizacion, { headers: this.getHeaders() });
  }

  obtenerTodasLasCotizaciones(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}`, { headers });
  }
  
}