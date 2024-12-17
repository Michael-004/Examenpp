import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class PronosticoService {

  constructor(
    private http: HttpClient,
    private servG: GeneralService
  ) { }

  // Listar todos los pronosticos
  listarPronosticos() {
    const url = this.servG.URLAPI + "pronosticosa";
    return this.http.get<any[]>(url);
  }

  // Obtener un equipo por ID
  obtenerPronosticoPorId(id: number) {
    const url = `${this.servG.URLAPI}pronosticos/${id}`;
    return this.http.get<any>(url);
  }

  // Registrar un nuevo pronostico
  registrarPronostico(objPronostico: any) {
    const url = this.servG.URLAPI + "pronosticos";
    return this.http.post<any>(url, objPronostico);
  }
}
