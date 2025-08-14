export interface Comentario {
  id: number;
  texto: string;
  fechaCreacion: Date;
  usuarioNombre: string;
}

export interface CrearComentario {
  texto: string;
}

export interface ComentarioAdmin extends Comentario {
  respuesta?: string;
  fechaRespuesta?: Date;
  adminRespuestaNombre?: string;
}

export interface ResponderComentario {
  comentarioId: number;
  respuesta: string;
}