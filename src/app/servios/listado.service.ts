import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ListadoService {

  constructor(
    private http: HttpClient,
    private servG: GeneralService
  ) { }

  listarAciertos() {
    const url = this.servG.URLAPI + "listado";
    return this.http.get<any[]>(url);
  }
}
