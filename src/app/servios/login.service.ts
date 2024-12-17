import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tokenKey = 'authToken'; // Clave para almacenar el token en localStorage

  constructor(
    private http: HttpClient,
    private generalService: GeneralService,
    private router: Router
  ) { }

  // Método para iniciar sesión
  login(usuario: string, clave: string): Observable<any> {
    const url = `${this.generalService.URLAPI}login`; // URL del endpoint de login
    const body = { usuario, clave };

    return this.http.post<any>(url, body).pipe(
      tap(response => {
        console.log('Respuesta del servidor:', response); // Verifica la respuesta
        if (response && response.token && response.id_usr && response.per_id) {
          this.storeToken(response.token);
          localStorage.setItem('id_usr', response.id_usr); // Asegúrate de que `id_usr` esté aquí
          localStorage.setItem('authToken', response.token); // Almacena el token
          localStorage.setItem('userRole', response.per_id.toString()); // Almacena el rol del usuario
          localStorage.setItem('nombreUsuario', response.nombres); // ¡Guarda el nombre del usuario!
          console.log('Usuario ID almacenado:', response.id_usr); // Verifica que se almacene
          // Aquí verificamos si el id_usr se almacena correctamente
          console.log(localStorage.getItem('authToken'));
          console.log('Usuario ID en localStorage:', localStorage.getItem('id_usr'));
          console.log('Datos almacenados en localStorage:', {
            id_usr: response.id_usr,
            authToken: response.token,
            userRole: response.per_id,
            nombreUsuario: response.nombres,
          });

          // Construir un único objeto del usuario para guardar
          const usuarioData = {
            id_usr: response.id_usr,
            authToken: response.token,
            userRole: response.per_id,
            nombreUsuario: response.nombres
          };

          localStorage.setItem('usuario', JSON.stringify(usuarioData)); // Guarda todo el usuario en un solo lugar

          console.log('Datos almacenados en localStorage:', usuarioData);
        }
      })
    );
  }

  // Almacena el token en localStorage
  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Obtiene el token almacenado en localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken(); // Retorna true si el token existe
  }

  // Cierra sesión y redirige a la página de inicio de sesión
  logout(): void {
    /* localStorage.removeItem(this.tokenKey); // Elimina el token
    localStorage.removeItem('id_usr'); // Elimina el ID del usuario
    localStorage.removeItem('userRole'); // Elimina el rol del usuario */
    localStorage.clear(); // Limpia todo el localStorage
    this.router.navigate(['/login']); // Redirige al login
  }

  // Obtiene los datos completos del usuario desde localStorage
  getUsuario(): any {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  // Obtiene el ID del usuario almacenado en localStorage
  getUserId(): number | null {
    const userId = localStorage.getItem('id_usr');
    return userId ? parseInt(userId, 10) : null;
  }

  // Obtiene el rol del usuario almacenado en localStorage
  getUserRole(): number | null {
    const userRole = localStorage.getItem('userRole');
    return userRole ? parseInt(userRole, 10) : null;
  }
}