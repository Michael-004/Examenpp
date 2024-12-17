import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/servios/general.service';
import { PartidoService } from 'src/app/servios/partido.service';
import { PronosticoService } from 'src/app/servios/pronostico.service';

@Component({
  selector: 'app-pronostico',
  templateUrl: './pronostico.page.html',
  styleUrls: ['./pronostico.page.scss'],
})
export class PronosticoPage implements OnInit {
  partidos: any[] = [];

  estadoPantalla: 'lista' | 'pronostico' = 'lista'; // Controla el estado de la pantalla
  partidoSeleccionado: any = null; // Almacena el partido seleccionado para pronosticar

  idRes: string = ''; // Para almacenar la selección del pronóstico
  valor: string = ''; // Para almacenar el valor del aporte económico

  constructor(
    private servG: GeneralService,
    private servPro: PronosticoService,
    private servP: PartidoService
  ) { }

  ngOnInit() {
    this.servP.listarPartidosActivos().subscribe((res) => {
      this.partidos = res;
    });
  }

  /* seleccionarPartido(partido: any) {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}'); // Obtiene el objeto almacenado
    console.log('Datos almacenados en localStorage:', localStorage.getItem('usuario'));

    // Validar si el usuario está autenticado
    if (!usuario.id_usr) { // Verifica que exista el usuario
      this.servG.fun_Mensaje('Por favor, inicia sesión para registrar un pronóstico.');
      return;
    }

    const id_usr = usuario.id_usr; // Extrae el ID del usuario

    const id_res = prompt('Ingrese su pronóstico (1: Local, 2: Visitante, 3: Empate)');
    const valor = prompt('Ingrese el aporte económico');

    if (id_res && valor) {
      const fecha_registro = new Date().toISOString(); // Generamos la fecha de registro

      // Verificamos si los datos son correctos antes de enviar
      const pronostico = {
        id_usr,
        id_par: partido.id_par,
        id_res,
        valor,
        fecha_registro
      };

      this.servPro.registrarPronostico(pronostico).subscribe(
        () => this.servG.fun_Mensaje('Pronóstico registrado'),
        (error) => this.servG.fun_Mensaje('Error al registrar el pronóstico')
      );
    } else {
      this.servG.fun_Mensaje('Por favor, ingrese todos los datos requeridos');
    }
  } */




  seleccionarPartido(partido: any) {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  
    if (!usuario.id_usr) { // Validar autenticación
      this.servG.fun_Mensaje('Por favor, inicia sesión para registrar un pronóstico.');
      return;
    }
  
    this.partidoSeleccionado = partido; // Guardar el partido seleccionado
    this.estadoPantalla = 'pronostico'; // Cambiar el estado para mostrar la pantalla de pronóstico
  }
  
  registrarPronostico(id_res: string, valor: string) {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const id_usr = usuario.id_usr;
  
    if (id_res && valor) {
      const fecha_registro = new Date().toISOString();
  
      const pronostico = {
        id_usr,
        id_par: this.partidoSeleccionado.id_par,
        id_res,
        valor,
        fecha_registro,
      };
  
      this.servPro.registrarPronostico(pronostico).subscribe(
        () => {
          this.servG.fun_Mensaje('Pronóstico registrado');
          this.estadoPantalla = 'lista'; // Volver a la lista de partidos
          this.partidoSeleccionado = null; // Limpiar selección
        },
        (error) => this.servG.fun_Mensaje('Error al registrar el pronóstico')
      );
    } else {
      this.servG.fun_Mensaje('Por favor, ingrese todos los datos requeridos');
    }
  }
  
}