// components/user-list/user-list.ts
import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios';
import { UsuarioResponse } from '../../interfaces/usuario-response';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioEditDialog } from '../usuario-edit-dialog/usuario-edit-dialog';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})
export class UserList {
  @Input() refreshTrigger?: Observable<void>;
  usuarios: UsuarioResponse[] = [];
  isLoading = true;
  displayedColumns: string[] = ['nombre', 'email', 'roles', 'acciones'];

  constructor(
    private usuariosService: UsuariosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.isLoading = true;
    this.usuariosService.getAllUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.isLoading = false;
      }
    });
  }

  eliminarUsuario(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar eliminación',
        message: '¿Estás seguro de eliminar este usuario?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuariosService.eliminarUsuario(id).subscribe({
          next: () => {
            this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', {
              duration: 3000
            });
            this.loadUsuarios(); // Recargar la lista
          },
          error: (err) => {
            console.error('Error al eliminar usuario:', err);
            this.snackBar.open(err.error?.mensaje || 'Error al eliminar usuario', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  ngOnChanges() {
    if (this.refreshTrigger) {
      this.refreshTrigger.subscribe(() => this.loadUsuarios());
    }
  }


  editarUsuario(usuario: UsuarioResponse): void {
    const dialogRef = this.dialog.open(UsuarioEditDialog, {
      width: '500px',
      data: { usuario }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.actualizarUsuario(usuario.id, result);
      }
    });
  }

  private actualizarUsuario(id: string, data: any): void {
    // Actualizar datos básicos
    this.usuariosService.actualizarUsuario({
      id,
      nombre: data.nombre,
      email: data.email
    }).subscribe({
      next: () => {
        // Actualizar rol si cambió
        if (data.rol !== this.usuarios.find(u => u.id === id)?.roles[0]) {
          this.usuariosService.cambiarRol({
            userId: id,
            nuevoRol: data.rol
          }).subscribe({
            next: () => {
              this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', { duration: 3000 });
              this.loadUsuarios();
            },
            error: (err) => this.handleError(err)
          });
        } else {
          this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.loadUsuarios();
        }
      },
      error: (err) => this.handleError(err)
    });
  }

  private handleError(err: any): void {
    console.error('Error:', err);
    this.snackBar.open(err.error?.mensaje || 'Error al actualizar usuario', 'Cerrar', { duration: 3000 });
  }
}
