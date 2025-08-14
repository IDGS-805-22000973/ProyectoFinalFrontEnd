import { Component } from '@angular/core';
import { VentaListComponent } from '../../components/venta-list/venta-list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VentaFormComponent } from '../../components/venta-form/venta-form';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-venta',
  imports: [
    CommonModule,
    VentaListComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './venta.html',
  styleUrl: './venta.css'
})
export class Venta {

  constructor(private dialog: MatDialog) { }

  openVentaForm(): void {
    const dialogRef = this.dialog.open(VentaFormComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes actualizar la lista de ventas si es necesario
      }
    });
  }

}
