import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/servios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';  // Almacena el usuario ingresado
  clave: string = '';    // Almacena la clave ingresada

  constructor(
    private loginService: LoginService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  // Método para manejar el inicio de sesión
  async login() {
    if (!this.usuario || !this.clave) {
      // Muestra alerta si faltan datos
      await this.presentAlert('Por favor, ingrese usuario y contraseña.');
      return;
    }

    this.loginService.login(this.usuario, this.clave).subscribe({
      next: async (response) => {
        if (response.auth) {
          // Redirige a la pantalla principal si el login fue exitoso
          this.router.navigate(['/principal']);
          const userRole = this.loginService.getUserRole();
          console.log('Rol del usuario:', userRole);
        } else {
          await this.presentAlert('Usuario o contraseña incorrectos.');
        }
      },
      error: async (err) => {
        console.error('Error en el login:', err);
        await this.presentAlert('Error al iniciar sesión. Intente nuevamente.');
      },
    });
  }

  // Método para mostrar alertas
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Inicio de Sesión',
      message,
      buttons: ['OK'],
      backdropDismiss: false, // Evita que se pueda interactuar fuera
    });
    await alert.present();
  }

  // Método para manejar el botón de retroceso
  goBack() {
    this.router.navigate(['/principal']); // Redirige a la página principal
  }
}