import { Component } from '@angular/core';
import { ClienteListComponent } from '../../components/cliente-list/cliente-list';

@Component({
  selector: 'app-cliente',
  imports:[
    ClienteListComponent
  ],
  templateUrl: './cliente.html',
  styleUrls: ['./cliente.css']
})
export class ClienteComponent {
  // Este componente actúa como contenedor principal
}