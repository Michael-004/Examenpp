import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public URLAPI: string = "http://localhost:3000/api/";

  constructor(  
     private router:Router,
    private toast:ToastController,
    private http: HttpClient,
  ) { }

  /* obtenerPartidosActivos(): Observable<any> {
    return this.http.get(`${this.URLAPI}/partidos/activos`);
  }

  registrarPronostico(data: any): Observable<any> {
    return this.http.post(`${this.URLAPI}pronosticos`, data); // Asegúrate de que esta URL sea correcta
  } */

     //funciones generales
  irA(url:string){
    this.router.navigateByUrl(url);
  }
 
  //funcion emite mensaje
  async fun_Mensaje(texto: string, tipo: string = 'success') {
    let t = await this.toast.create({
      message: texto,
      color: tipo,
      duration: 3000
    });
    t.present();
  }

  
}



