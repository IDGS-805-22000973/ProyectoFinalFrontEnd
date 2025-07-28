// pages/usuarios/usuarios.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserList } from '../../components/user-list/user-list';
import { UserForm } from '../../components/user-form/user-form';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, UserList, UserForm],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class Usuarios {
  refreshList() {
    // Este método será llamado cuando se cree un nuevo usuario
  }
}