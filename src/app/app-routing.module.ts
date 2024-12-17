import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    loadChildren: () => import('./paginas/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'partido',
    loadChildren: () => import('./paginas/partido/partido.module').then( m => m.PartidoPageModule)
  },
  {
    path: 'pronostico',
    loadChildren: () => import('./paginas/pronostico/pronostico.module').then( m => m.PronosticoPageModule)
  },
  {
    path: 'resultado',
    loadChildren: () => import('./paginas/resultado/resultado.module').then( m => m.ResultadoPageModule)
  },
  {
    path: 'ganador',
    loadChildren: () => import('./paginas/ganador/ganador.module').then( m => m.GanadorPageModule)
  },
  {
    path: 'listado',
    loadChildren: () => import('./paginas/listado/listado.module').then( m => m.ListadoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
