import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VentaAdminDto, ProductoDto } from '../interfaces/venta';
import { UsuarioDto, ActualizarNombreDto, ActualizarEmailDto, CambiarPasswordDto } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly endpoint = `${environment.apiUrl}Cliente`;

  constructor(private readonly http: HttpClient) { }


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  // Obtener perfil del usuario
  obtenerPerfil(): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${this.endpoint}/mi-perfil`, { headers: this.getHeaders() });
  }

  // Actualizar nombre
  actualizarNombre(nombre: string): Observable<any> {
    const body: ActualizarNombreDto = { nombre };
    return this.http.put(`${this.endpoint}/actualizar-nombre`, body, { headers: this.getHeaders() });
  }

  // Actualizar email
  actualizarEmail(nuevoEmail: string): Observable<any> {
    const body: ActualizarEmailDto = { nuevoEmail };
    return this.http.put(`${this.endpoint}/actualizar-email`, body, { headers: this.getHeaders() });
  }

  // Cambiar contraseña
  cambiarPassword(passwordActual: string, nuevoPassword: string): Observable<any> {
    const body: CambiarPasswordDto = { passwordActual, nuevoPassword };
    return this.http.put(`${this.endpoint}/cambiar-password`, body, { headers: this.getHeaders() });
  }

  obtenerCompras(): Observable<VentaAdminDto[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<VentaAdminDto[]>(`${this.endpoint}/mis-compras`, { headers });
  }

  obtenerProductos(): Observable<ProductoDto[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<ProductoDto[]>(`${this.endpoint}/mis-productos`, { headers });
  }
}