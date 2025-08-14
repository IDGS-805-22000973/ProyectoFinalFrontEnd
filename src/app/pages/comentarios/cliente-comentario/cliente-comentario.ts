import { Component, OnInit } from '@angular/core';
import { ComentarioService } from '../../../services/comentario';
import { Comentario, CrearComentario } from '../../../interfaces/comentario-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-comentario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-comentario.html',
  styleUrls: ['./cliente-comentario.css']
})
export class ClienteComentarioComponent implements OnInit {
  comentarios: Comentario[] = [];
  nuevoComentario: CrearComentario = { texto: '' };
  cargando = false;
  error = '';

  constructor(private comentarioService: ComentarioService) {}

  ngOnInit(): void {
    this.cargarComentarios();
  }

  cargarComentarios(): void {
    this.cargando = true;
    this.comentarioService.obtenerMisComentarios().subscribe({
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

  agregarComentario(): void {
    if (!this.nuevoComentario.texto.trim()) return;

    this.cargando = true;
    this.comentarioService.crearComentario(this.nuevoComentario).subscribe({
      next: (comentario) => {
        this.comentarios.unshift(comentario); // Agregar al inicio
        this.nuevoComentario = { texto: '' };
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al guardar el comentario';
        this.cargando = false;
        console.error(err);
      }
    });
  }
}