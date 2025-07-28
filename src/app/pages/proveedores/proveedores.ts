// pages/proveedores/proveedores.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorList } from '../../components/proveedor-list/proveedor-list';
import { ProveedorFormComponent } from '../../components/proveedor-form/proveedor-form';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [
    CommonModule,
    ProveedorList,
    ProveedorFormComponent,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './proveedores.html',
  styleUrls: ['./proveedores.css']
})
export class Proveedores {
  selectedTab = 0;
  refreshList$ = new Subject<void>();

  onProveedorCreado(): void {
    this.refreshList$.next();
    this.selectedTab = 0; // Cambia a la pestaña de lista
  }
}