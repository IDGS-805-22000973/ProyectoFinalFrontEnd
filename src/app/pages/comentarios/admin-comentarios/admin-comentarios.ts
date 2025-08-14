import { Component, OnInit } from '@angular/core';
import { ComentarioAdminService } from '../../../services/comentario-admin';
import { ComentarioAdmin, ResponderComentario, Comentario } from '../../../interfaces/comentario-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-comentarios',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './admin-comentarios.html',
  styleUrls: ['./admin-comentarios.css']
})
export class AdminComentariosComponent implements OnInit {
  comentarios: ComentarioAdmin[] = [];
  comentarioSeleccionado: ComentarioAdmin | null = null;
  comentariosSeleccionados: Comentario[] = [];
  respuesta: string = '';
  cargando = false;
  error = '';

  constructor(
    private comentarioAdminService: ComentarioAdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarComentarios();
  }

  cargarComentarios(): void {
    this.cargando = true;
    this.comentarioAdminService.obtenerTodosComentarios().subscribe({
      next: (data) => {
        this.comentarios = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar comentarios';
        this.cargando = false;
        console.error(err);
      }
    });
  }

  seleccionarComentario(comentario: ComentarioAdmin): void {
    this.comentarioSeleccionado = comentario;
    this.respuesta = comentario.respuesta || '';
  }

  enviarRespuesta(): void {
    if (!this.comentarioSeleccionado || !this.respuesta.trim()) return;

    const respuestaDto: ResponderComentario = {
      comentarioId: this.comentarioSeleccionado.id,
      respuesta: this.respuesta
    };

    this.cargando = true;
    this.comentarioAdminService.responderComentario(respuestaDto).subscribe({
      next: () => {
        this.cargarComentarios();
        this.comentarioSeleccionado = null;
        this.respuesta = '';
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al enviar la respuesta';
        this.cargando = false;
        console.error(err);
      }
    });
  }

  eliminarComentario(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar eliminación',
        message: '¿Estás seguro de eliminar este comentario?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.comentarioAdminService.eliminarComentario(id).subscribe({
          next: () => {
            this.snackBar.open('Comentario eliminado correctamente', 'Cerrar', {
              duration: 3000
            });
            this.cargarComentarios(); // Recargar la lista
          },
          error: (err) => {
            console.error('Error al eliminar comentario:', err);
            this.snackBar.open(err.error?.mensaje || 'Error al eliminar comentario', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }
}