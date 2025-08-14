import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ProductoService } from '../../services/producto';
import { CrearProductoDto, ComponenteDto } from '../../interfaces/crear-producto-dto';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MateriaPrimaService } from '../../services/materia-prima';
import { MateriaPrimaResponse } from '../../interfaces/materia-prima-response';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './producto-form.html',
  styleUrls: ['./producto-form.css']
})
export class ProductoFormComponent {
  productoForm: FormGroup;
  materiasPrimas: MateriaPrimaResponse[] = [];
  @Output() productoCreado = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private materiaPrimaService: MateriaPrimaService,
    private snackBar: MatSnackBar
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', Validators.maxLength(255)],
      componentes: this.fb.array([this.crearComponenteFormGroup()])
    });

    this.cargarMateriasPrimas();
  }

  get componentes(): FormArray {
    return this.productoForm.get('componentes') as FormArray;
  }

  crearComponenteFormGroup(): FormGroup {
    return this.fb.group({
      materiaPrimaId: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  agregarComponente(): void {
    this.componentes.push(this.crearComponenteFormGroup());
  }

  removerComponente(index: number): void {
    if (this.componentes.length > 1) {
      this.componentes.removeAt(index);
    }
  }

  cargarMateriasPrimas(): void {
    this.materiaPrimaService.getAllMateriasPrimas().subscribe({
      next: (data) => this.materiasPrimas = data,
      error: (err) => console.error('Error al cargar materias primas', err)
    });
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      const productoDto: CrearProductoDto = this.productoForm.value;

      this.productoService.crearProducto(productoDto).subscribe({
        next: (response) => {
          this.snackBar.open('Producto creado exitosamente', 'Cerrar', { duration: 3000 });
          this.productoCreado.emit();
          this.productoForm.reset();
          // Reiniciar con un componente
          while (this.componentes.length > 1) {
            this.componentes.removeAt(0);
          }
          this.componentes.at(0).reset();
        },
        error: (err) => {
          console.error('Error al crear producto:', err);
          this.snackBar.open(err.error?.mensaje || 'Error al crear producto', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }


  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      // Aquí puedes manejar el archivo, como subirlo o asignarlo a tu formulario
       this.productoForm.patchValue({ documentacion: file });
    } else {
      // Manejar error de tipo de archivo
    }
  }

  removeFile() {
    this.selectedFile = null;
    // Limpiar el valor en el formulario si es necesario
    // this.productoForm.patchValue({ documentacion: null });
  }


}