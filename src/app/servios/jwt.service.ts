import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../servios/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtService implements HttpInterceptor {

  constructor(private loginService: LoginService, private router: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtener el token del servicio de login
    const token = this.loginService.getToken();

    // Clonar la solicitud y agregar el encabezado Authorization si el token existe
    if (token) {
      console.log('Agregando token al encabezado Authorization (jwt.serivce.ts)', token);
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
      console.log('Solicitud modificada con encabezado:', request);
    }

    // Manejar errores de respuesta
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Token inválido o expirado, redirigir al login
          this.loginService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
