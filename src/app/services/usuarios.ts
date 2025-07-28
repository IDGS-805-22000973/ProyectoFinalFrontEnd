import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsuarioResponse } from '../interfaces/usuario-response';
import { CrearUsuarioRequest, CrearUsuarioResponse } from '../interfaces/crear-usuario';
import { ActualizarUsuarioRequest, ActualizarUsuarioResponse } from '../interfaces/actualizar-usuario';
import { ActualizarRolRequest, ActualizarRolResponse } from '../interfaces/actualizar-rol';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = `${environment.apiUrl}usuarios`;

  constructor(private http: HttpClient) { }

  getAllUsuarios(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(this.apiUrl);
  }

  crearUsuario(usuario: CrearUsuarioRequest): Observable<CrearUsuarioResponse> {
    return this.http.post<CrearUsuarioResponse>(this.apiUrl, usuario);
  }

  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  actualizarUsuario(data: ActualizarUsuarioRequest): Observable<ActualizarUsuarioResponse> {
    return this.http.put<ActualizarUsuarioResponse>(`${this.apiUrl}/${data.id}`, {
      nombre: data.nombre,
      email: data.email
    });
  }

  cambiarRol(data: ActualizarRolRequest): Observable<ActualizarRolResponse> {
    return this.http.put<ActualizarRolResponse>(`${this.apiUrl}/cambiar-rol`, data);
  }
}