import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CotizacionService } from '../../services/cotizacion';
import { ProductoService } from '../../services/producto';
import { CrearCotizacionDto, ItemCotizacionDto } from '../../interfaces/cotizacion-model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-cotizacion',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cotizacion.html',
  styleUrls: ['./cotizacion.css']
})
export class CotizacionComponent implements OnInit {
  cotizacionForm: FormGroup;
  productos: any[] = [];
  productosSeleccionados: any[] = [];
  cargando = false;
  mensaje = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private cotizacionService: CotizacionService,
    private productoService: ProductoService
  ) {
    this.cotizacionForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      empresa: [''],
      productoId: [''],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        this.error = 'Error al cargar productos';
        console.error(err);
      }
    });
  }

  agregarProducto(): void {
    if (this.cotizacionForm.get('productoId')?.value && this.cotizacionForm.get('cantidad')?.value > 0) {
      const productoId = this.cotizacionForm.get('productoId')?.value;
      const cantidad = this.cotizacionForm.get('cantidad')?.value;
      
      const producto = this.productos.find(p => p.id == productoId);
      
      if (producto) {
        this.productosSeleccionados.push({
          ...producto,
          cantidad,
          subtotal: producto.precioVenta * cantidad
        });
        
        // Resetear controles de producto
        this.cotizacionForm.get('productoId')?.reset();
        this.cotizacionForm.get('cantidad')?.setValue(1);
      }
    }
  }

  eliminarProducto(index: number): void {
    this.productosSeleccionados.splice(index, 1);
  }

  calcularTotal(): number {
    return this.productosSeleccionados.reduce((sum, item) => sum + item.subtotal, 0);
  }

  enviarCotizacion(): void {
    if (this.cotizacionForm.invalid || this.productosSeleccionados.length === 0) {
      this.error = 'Complete todos los campos y agregue al menos un producto';
      return;
    }

    const cotizacionData: CrearCotizacionDto = {
      nombreCompleto: this.cotizacionForm.get('nombreCompleto')?.value,
      email: this.cotizacionForm.get('email')?.value,
      telefono: this.cotizacionForm.get('telefono')?.value,
      empresa: this.cotizacionForm.get('empresa')?.value,
      productos: this.productosSeleccionados.map(item => ({
        productoId: item.id,
        cantidad: item.cantidad
      }))
    };

    this.cargando = true;
    this.cotizacionService.crearCotizacion(cotizacionData).subscribe({
      next: (response) => {
        this.mensaje = 'Cotización creada exitosamente';
        this.cotizacionForm.reset();
        this.productosSeleccionados = [];
        this.error = '';
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al crear la cotización';
        this.cargando = false;
        console.error(err);
      }
    });
  }
}