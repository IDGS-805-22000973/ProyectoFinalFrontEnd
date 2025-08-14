// venta-form.component.ts
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { VentaService } from '../../services/venta';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductoDto, UsuarioDto, CrearVentaAdminDto } from '../../interfaces/venta';


@Component({
  selector: 'app-venta-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './venta-form.html',
  styleUrls: ['./venta-form.css']
})
export class VentaFormComponent implements OnInit {
  ventaForm: FormGroup;
  productos: ProductoDto[] = [];
  clientes: UsuarioDto[] = [];
  @Output() ventaCreada = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private ventaService: VentaService,
    private dialogRef: MatDialogRef<VentaFormComponent>
  ) {
    this.ventaForm = this.fb.group({
      productoId: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      clienteId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarClientes();
  }

  cargarProductos(): void {
    this.ventaService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
      }
    });
  }

  cargarClientes(): void {
    this.ventaService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
      },
      error: (err) => {
        console.error('Error al cargar clientes', err);
      }
    });
  }

  onSubmit(): void {
    if (this.ventaForm.valid) {
      const ventaData: CrearVentaAdminDto = {
        productoId: this.ventaForm.value.productoId,
        cantidad: this.ventaForm.value.cantidad,
        clienteId: this.ventaForm.value.clienteId
      };

      this.ventaService.crearVenta(ventaData).subscribe({
        next: (response) => {
          console.log('Venta creada exitosamente', response);
          this.ventaCreada.emit();
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al crear venta', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}