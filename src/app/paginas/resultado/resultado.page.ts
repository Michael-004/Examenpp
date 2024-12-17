import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/servios/general.service';
import { PartidoService } from 'src/app/servios/partido.service';
import { ResultadofinalService } from 'src/app/servios/resultadofinal.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements OnInit {
  partidos: any[] = []; // Lista de partidos activos
  partidoSeleccionado: any = null; // Partido seleccionado por el usuario
  idRes: number | null = null; // Resultado (1: Local, 2: Visitante, 3: Empate)

  constructor(
    private servRF: ResultadofinalService,
    private servP: PartidoService,
    private servG: GeneralService
  ) { }

  ngOnInit() {
    this.obtenerPartidosActivos(); // Cargar la lista de partidos activos al iniciar la página
  }

  // Obtener la lista de partidos activos desde el servicio
  obtenerPartidosActivos() {
    this.servP.listarPartidosActivos().subscribe(
      (partidos) => {
        this.partidos = partidos;
      },
      (error) => {
        this.servG.fun_Mensaje('Error al cargar los partidos activos', 'danger');
      }
    );
  }

  // Seleccionar un partido de la lista
  seleccionarPartido(partido: any) {
    this.partidoSeleccionado = partido;
  }

  // Cancelar la selección de un partido
  cancelarSeleccion() {
    this.partidoSeleccionado = null;
    this.idRes = null;
  }

  // Registrar el resultado del partido seleccionado
  registrarResultado() {
    if (this.partidoSeleccionado && this.idRes !== null) {
      const id = this.partidoSeleccionado.id_par; // ID del partido
      this.servRF.actualizarResultado(id, this.idRes).subscribe(
        (res) => {
          this.servG.fun_Mensaje('Resultado registrado correctamente');
          this.cancelarSeleccion(); // Limpiar la selección
          this.obtenerPartidosActivos(); // Actualizar la lista de partidos activos
        },
        (error) => {
          this.servG.fun_Mensaje('Error al registrar el resultado', 'danger');
        }
      );
    } else {
      this.servG.fun_Mensaje('Por favor, selecciona un resultado', 'warning');
    }
  }

}
