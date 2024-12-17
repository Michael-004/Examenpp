import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/servios/general.service';
import { ListadoService } from 'src/app/servios/listado.service';
import { PartidoService } from 'src/app/servios/partido.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  listado: any[] = []; // Aquí almacenaremos los datos del backend.
  partidos: any[] = [];

  constructor(
    private servL: ListadoService,
    private servP: PartidoService,
    private servG: GeneralService
  ) { }

  ngOnInit() {
    this.obtenerListado();
    //this.obtenerPartidosActivos(); // Cargar la lista de partidos activos al iniciar la página
  }

  obtenerListado() {
    this.servL.listarAciertos().subscribe(
      (data) => {
        this.listado = data;
        console.log('Datos obtenidos:', this.listado);
      },
      (error) => {
        console.error('Error al obtener el listado:', error);
      }
    );
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

}
