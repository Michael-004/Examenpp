import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquiposService } from 'src/app/servios/equipos.service';
import { GeneralService } from 'src/app/servios/general.service';
import { PartidoService } from 'src/app/servios/partido.service';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.page.html',
  styleUrls: ['./partido.page.scss'],
})
export class PartidoPage implements OnInit {
  equipos: any[] = []; // Lista de equipos
  partido = {
    eq_uno: null, // ID del equipo local
    eq_dos: null, // ID del equipo visitante
    fecha_par: null, // Fecha del partido
    estado_par: null, // Estado del partido (activo o cerrado)
  };
  constructor(
    private router: Router,
    private servEq: EquiposService,
    private servP: PartidoService,
    private servG: GeneralService
  ) { }

  ngOnInit() {
    this.cargarEquipos();
  }
  // Cargar lista de equipos desde el servicio
  cargarEquipos() {
    this.servEq.listarEquipos().subscribe({
      next: (data: any) => {
        this.equipos = data;
      },
      error: (error) => {
        console.error('Error al cargar los equipos:', error);
        this.servG.fun_Mensaje('Error al cargar los equipos', 'danger');
      },
    });
  }

  // Registrar un partido
  registrarPartido() {
    // Validaciones básicas
    if (!this.partido.eq_uno || !this.partido.eq_dos || !this.partido.fecha_par || !this.partido.estado_par) {
      this.servG.fun_Mensaje('Por favor, completa todos los campos.');
      return;
    }

    // Verifica que los equipos no sean iguales
    if (this.partido.eq_uno === this.partido.eq_dos) {
      this.servG.fun_Mensaje('El equipo local y visitante no pueden ser el mismo.');
      return;
    }

    // Llama al servicio para registrar el partido
    this.servP.registrarPartido(this.partido).subscribe({
      next: (response: any) => {
        this.servG.fun_Mensaje('Partido registrado exitosamente.');
        this.router.navigate(['/principal']);
      },
      error: (error) => {
        console.error('Error al registrar el partido:', error);
        this.servG.fun_Mensaje('Error al registrar el partido', 'danger');
      },
    });
  }

  volverAPrincipal() {
    this.router.navigate(['/principal']);
  }
}