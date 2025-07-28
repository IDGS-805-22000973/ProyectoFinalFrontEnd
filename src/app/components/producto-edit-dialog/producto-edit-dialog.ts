import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ProductoService } from '../../services/producto';
import { ActualizarProductoDto, ComponenteDto } from '../../interfaces/crear-producto-dto';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MateriaPrimaService } from '../../services/materia-prima';
import { MateriaPrimaResponse } from '../../interfaces/materia-prima-response';
import { ProductoResponse } from '../../interfaces/producto';

@Component({
  selector: 'app-producto-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSpinner
  ],
  templateUrl: './producto-edit-dialog.html',
  styleUrls: ['./producto-edit-dialog.css']
})
export class ProductoEditDialog implements OnInit {
  productoForm: FormGroup;
  materiasPrimas: MateriaPrimaResponse[] = [];
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private materiaPrimaService: MateriaPrimaService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProductoEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { productoId: number }
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', Validators.maxLength(255)],
      precioVenta: ['', [Validators.required, Validators.min(0.01)]],
      componentes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  get componentes(): FormArray {
    return this.productoForm.get('componentes') as FormArray;
  }

  crearComponenteFormGroup(componente?: any): FormGroup {
    return this.fb.group({
      materiaPrimaId: [componente?.materiaPrimaId || '', Validators.required],
      cantidad: [componente?.cantidad || '', [Validators.required, Validators.min(1)]]
    });
  }

  agregarComponente(componente?: any): void {
    this.componentes.push(this.crearComponenteFormGroup(componente));
  }

  removerComponente(index: number): void {
    this.componentes.removeAt(index);
  }

  cargarDatos(): void {
    this.materiaPrimaService.getAllMateriasPrimas().subscribe({
      next: (materias) => {
        this.materiasPrimas = materias;
        this.cargarProducto();
      },
      error: (err) => {
        console.error('Error al cargar materias primas', err);
        this.isLoading = false;
      }
    });
  }

  cargarProducto(): void {
    this.productoService.getProductoById(this.data.productoId).subscribe({
      next: (producto) => {
        this.productoForm.patchValue({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precioVenta: producto.precioVenta
        });

        // Limpiar y agregar componentes
        while (this.componentes.length > 0) {
          this.componentes.removeAt(0);
        }

        producto.componentes.forEach(comp => {
          this.agregarComponente({
            materiaPrimaId: comp.materiaPrimaId,
            cantidad: comp.cantidad
          });
        });

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar producto', err);
        this.snackBar.open('Error al cargar producto', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      const productoDto: ActualizarProductoDto = this.productoForm.value;
      this.isLoading = true;

      this.productoService.actualizarProducto(this.data.productoId, productoDto).subscribe({
        next: (response) => {
          this.snackBar.open('Producto actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al actualizar producto:', err);
          this.snackBar.open(err.error?.mensaje || 'Error al actualizar producto', 'Cerrar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }
}