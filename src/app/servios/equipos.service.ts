import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(
    private http: HttpClient,
    private servG: GeneralService
  ) { }

  // Listar todos los equipos
  listarEquipos() {
    const url = this.servG.URLAPI + "equipos";
    return this.http.get<any[]>(url);
  }

  // Obtener un equipo por ID
  obtenerEquipoPorId(id: number) {
    const url = `${this.servG.URLAPI}equipos/${id}`;
    return this.http.get<any>(url);
  }

  // Registrar un nuevo equipo (opcional, si es parte de los requerimientos)
  registrarEquipo(objEquipo: any) {
    const url = this.servG.URLAPI + "equipos";
    return this.http.post<any>(url, objEquipo);
  }
}
