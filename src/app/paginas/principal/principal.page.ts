import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/servios/general.service';
import { LoginService } from 'src/app/servios/login.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  nombreUsuario: string = ''; // Variable para almacenar el nombre del usuario logueado
  userRole: number = 0; // Para almacenar el rol del usuario

  constructor(
    public servG:GeneralService,
    private loginService: LoginService,
    private router: Router
  ) { }

  
  ngOnInit() {
    // Inicializar datos, como el nombre del usuario logueado
    this.cargarDatosUsuario();
  }

  // Cargar información del usuario logueado (opcional)
  cargarDatosUsuario() {
    // Aquí podrías obtener el nombre del usuario desde el localStorage o un servicio
    /* const usuarioId = this.loginService.getUserId();
    if (usuarioId) {
      this.nombreUsuario = `Usuario: ${usuarioId}`; // O llama a un servicio para obtener más detalles
    } else {
      this.nombreUsuario = 'Usuario no identificado';
    } */
    this.userRole = parseInt(localStorage.getItem('userRole') || '0', 10); // Obtén el rol
    const nombreUsuario  = localStorage.getItem('nombreUsuario');
    this.nombreUsuario = nombreUsuario  ? `${nombreUsuario }` : 'Usuario no identificado';
  }

  // Cerrar sesión
  cerrarSesion() {
    this.loginService.logout(); // Limpia los datos de sesión
    this.router.navigate(['/login']); // Redirige al login
  }

  puedeAcceder(boton: string): boolean {
    const accesos: Record<number, string[]> = {
      1: ['partido', 'pronostico', 'resultado', 'listado', 'ganador'], // Admin
      2: ['pronostico', 'ganador'], // Usuario normal
    };
    return accesos[this.userRole]?.includes(boton) || false;
  }
}
