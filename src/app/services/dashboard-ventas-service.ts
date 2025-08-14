import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardVentasService {
  private baseUrl = `${environment.apiUrl}Ventas`;

  constructor(private http: HttpClient) { }

  getResumenVentas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/resumen`);
  }
}