import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComentarioAdmin, ResponderComentario } from '../interfaces/comentario-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentarioAdminService {
  private apiUrl = `${environment.apiUrl}admin/ComentariosAdmin`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  obtenerTodosComentarios(): Observable<ComentarioAdmin[]> {
    const headers = this.getHeaders();
    return this.http.get<ComentarioAdmin[]>(`${this.apiUrl}/todos-comentarios`, { headers });
  }

  responderComentario(respuesta: ResponderComentario): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/responder-comentario`, respuesta, { headers });
  }

  eliminarComentario(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/eliminar-comentario/${id}`, { headers });
  }
}