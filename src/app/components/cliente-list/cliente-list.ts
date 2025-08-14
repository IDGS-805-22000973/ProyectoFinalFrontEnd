import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente';
import { VentaAdminDto, ProductoDto } from '../../interfaces/venta';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente-list.html',
  styleUrls: ['./cliente-list.css']
})
export class ClienteListComponent implements OnInit {
  ventas: VentaAdminDto[] = [];
  productos: ProductoDto[] = [];
  vistaActual: 'compras' | 'productos' = 'compras';
  cargando = false;
  error: string | null = null;

  constructor(
    private readonly clienteService: ClienteService,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargarCompras();
  }

  cargarCompras(): void {
    this.cargando = true;
    this.error = null;
    this.clienteService.obtenerCompras().subscribe({
      next: (data) => {
        this.ventas = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las compras';
        this.cargando = false;
        console.error(err);
      }
    });
  }

  cargarProductos(): void {
    this.cargando = true;
    this.error = null;
    this.clienteService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los productos';
        this.cargando = false;
        console.error(err);
      }
    });
  }

  cambiarVista(vista: 'compras' | 'productos'): void {
    this.vistaActual = vista;
    if (vista === 'compras') {
      this.cargarCompras();
    } else {
      this.cargarProductos();
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}