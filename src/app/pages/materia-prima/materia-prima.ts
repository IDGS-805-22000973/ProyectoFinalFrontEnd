// pages/materia-prima/materia-prima.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaPrimaListComponent } from '../../components/materia-prima-list/materia-prima-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { MateriaPrimaFormComponent } from '../../components/materia-prima-form/materia-prima-form';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-materia-prima',
  standalone: true,
  imports: [
    CommonModule,
    MateriaPrimaListComponent,
    MateriaPrimaFormComponent,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './materia-prima.html',
  styleUrls: ['./materia-prima.css']
})
export class MateriaPrima {
  selectedTab = 0;
  refreshList$ = new Subject<void>();

  onMateriaCreada(): void {
    this.refreshList$.next();
    this.selectedTab = 0;
  }
}