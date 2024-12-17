import { Component, OnInit } from '@angular/core';
import { GanadorService } from 'src/app/servios/ganador.service';
import { GeneralService } from 'src/app/servios/general.service';

@Component({
  selector: 'app-ganador',
  templateUrl: './ganador.page.html',
  styleUrls: ['./ganador.page.scss'],
})
export class GanadorPage implements OnInit {
  ganador: any = null; // Variable para almacenar el ganador
  mensajeError: string = ''; // Mensaje para errores

  constructor(
    private servGa: GanadorService,
    private servG: GeneralService
  ) { }

  ngOnInit() {
    this.cargarGanador();
  }

  /* cargarGanador() {
    this.servGa.listarGanadores().subscribe({
      next: (data) => {
        this.ganador = data; // Asignar el ganador a la variable
      },
      error: (err) => {
        console.error('Error al obtener el ganador:', err);
        this.mensajeError = 'No se pudo cargar el ganador. Intenta nuevamente.';
      }
    });
  } */

  cargarGanador() {
    this.servGa.listarGanadores().subscribe({
      next: (data) => {
        if (data) {
          this.ganador = data; // Asignar el ganador a la variable si existe
        } else {
          this.mensajeError = 'Aún no hay un ganador definido.';
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.mensajeError = 'Aún no hay un ganador definido.';
        } else {
          //console.error('Error inesperado al obtener el ganador:', err);
          this.mensajeError = 'No se pudo cargar el ganador. Intenta nuevamente.';
        }
      },
    });
  }

}
