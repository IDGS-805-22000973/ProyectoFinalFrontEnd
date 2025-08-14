import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { ComentarioAdminService } from '../../services/comentario-admin';
import { ComentarioAdmin } from '../../interfaces/comentario-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  auth = inject(Auth);
  comentarioService = inject(ComentarioAdminService);
  comentarios: ComentarioAdmin[] = [];

  ngOnInit(): void {
    this.cargarComentarios();
  }

  cargarComentarios() {
    this.comentarioService.obtenerTodosComentarios().subscribe({
      next: (data) => {
        this.comentarios = data;
      },
      error: (error) => {
        console.error('Error al cargar comentarios:', error);
      }
    });
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
}