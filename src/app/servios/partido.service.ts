import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  constructor(
    private http: HttpClient,
    private servG: GeneralService
  ) { }

  // Registrar un partido
  registrarPartido(objPartido: any) {
    const url = this.servG.URLAPI + "partidos";
    return this.http.post<any>(url, objPartido);
  }

  // Listar partidos activos (opcional, si existe en el backend)
  listarPartidosActivos() {
    const url = this.servG.URLAPI + "partidos/activos";
    return this.http.get<any[]>(url);
  }
}
