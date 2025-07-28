// services/materia-prima.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MateriaPrimaResponse } from '../interfaces/materia-prima-response';
import { MateriaPrimaRequest } from '../interfaces/materia-prima-request';

@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService {
  private apiUrl = `${environment.apiUrl}MateriaPrima`;

  constructor(private http: HttpClient) { }

  getAllMateriasPrimas(): Observable<MateriaPrimaResponse[]> {
    return this.http.get<MateriaPrimaResponse[]>(this.apiUrl);
  }

  crearMateriaPrima(materia: MateriaPrimaRequest): Observable<any> {
    return this.http.post(this.apiUrl, materia);
  }


  actualizarMateriaPrima(id: number, materia: MateriaPrimaRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, materia);
  }

  eliminarMateriaPrima(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}