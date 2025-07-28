import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CompraMateriaPrimaService } from '../../services/compra-materia-prima';
import { CrearCompraDto, DetalleCompraDto } from '../../interfaces/crear-compra-dto';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProveedoresService } from '../../services/proveedores';
import { MateriaPrimaService } from '../../services/materia-prima';
import { ProveedorResponse } from '../../interfaces/proveedor-response';
import { MateriaPrimaResponse } from '../../interfaces/materia-prima-response';

@Component({
  selector: 'app-compra-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './compra-form.html',
  styleUrls: ['./compra-form.css']
})


export class CompraFormComponent {
  compraForm: FormGroup;
  proveedores: ProveedorResponse[] = [];
  materiasPrimas: MateriaPrimaResponse[] = [];
  @Output() compraCreada = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private compraService: CompraMateriaPrimaService,
    private proveedorService: ProveedoresService,
    private materiaPrimaService: MateriaPrimaService,
    private snackBar: MatSnackBar
  ) {
    this.compraForm = this.fb.group({
      proveedorId: ['', Validators.required],
      detalles: this.fb.array([this.crearDetalleFormGroup()])
    });

    this.cargarProveedores();
    this.cargarMateriasPrimas();
  }

  get detalles(): FormArray {
    return this.compraForm.get('detalles') as FormArray;
  }

  crearDetalleFormGroup(): FormGroup {
    return this.fb.group({
      materiaPrimaId: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      costoUnitario: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  agregarDetalle(): void {
    this.detalles.push(this.crearDetalleFormGroup());
  }

  removerDetalle(index: number): void {
    if (this.detalles.length > 1) {
      this.detalles.removeAt(index);
    }
  }

  cargarProveedores(): void {
    this.proveedorService.getAllProveedores().subscribe({
      next: (data) => this.proveedores = data,
      error: (err) => console.error('Error al cargar proveedores', err)
    });
  }

  cargarMateriasPrimas(): void {
    this.materiaPrimaService.getAllMateriasPrimas().subscribe({
      next: (data) => this.materiasPrimas = data,
      error: (err) => console.error('Error al cargar materias primas', err)
    });
  }

  onSubmit(): void {
    if (this.compraForm.valid) {
      const compraDto: CrearCompraDto = this.compraForm.value;

      this.compraService.crearCompra(compraDto).subscribe({
        next: (response) => {
          this.snackBar.open('Compra registrada exitosamente', 'Cerrar', { duration: 3000 });
          this.compraCreada.emit();
          this.compraForm.reset();
          // Reiniciar con un detalle
          while (this.detalles.length > 1) {
            this.detalles.removeAt(0);
          }
          this.detalles.at(0).reset();
        },
        error: (err) => {
          console.error('Error al crear compra:', err);
          this.snackBar.open(err.error?.mensaje || 'Error al crear compra', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}