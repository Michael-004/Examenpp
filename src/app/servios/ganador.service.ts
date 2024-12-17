import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class GanadorService {

  constructor(
    private http: HttpClient,
    private servG: GeneralService
  ) { }

  listarGanadores() {
    const url = this.servG.URLAPI + "ganadores";
    return this.http.get<any[]>(url);
  }
}
