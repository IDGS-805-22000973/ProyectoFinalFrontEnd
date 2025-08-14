// src/app/services/comentario.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario, CrearComentario } from '../interfaces/comentario-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private apiUrl = `${environment.apiUrl}Cliente`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  crearComentario(comentario: CrearComentario): Observable<Comentario> {
    const headers = this.getHeaders();
    return this.http.post<Comentario>(
      `${this.apiUrl}/crear-comentario`, 
      comentario, 
      { headers }
    );
  }

  obtenerMisComentarios(): Observable<Comentario[]> {
    const headers = this.getHeaders();
    return this.http.get<Comentario[]>(
      `${this.apiUrl}/mis-comentarios`, 
      { headers }
    );
  }
}