import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ResultadofinalService {

  constructor(
    private http: HttpClient,
    private servG: GeneralService
  ) { }

  actualizarResultado(id: number, id_res: number) {
    const url = `${this.servG.URLAPI}resultadofinal/${id}`;
    const body = { id_res }; // El cuerpo de la solicitud
    return this.http.patch<any>(url, body); // Enviar solicitud PATCH con el cuerpo
  }
}
