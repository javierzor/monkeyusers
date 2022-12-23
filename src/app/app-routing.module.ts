import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'confirmesucorreo',
    loadChildren: () => import('./confirmesucorreo/confirmesucorreo.module').then( m => m.ConfirmesucorreoPageModule)
  },
  {
    path: 'verificarproducto',
    loadChildren: () => import('./verificarproducto/verificarproducto.module').then( m => m.VerificarproductoPageModule)
  },
  {
    path: 'scannertraking',
    loadChildren: () => import('./modals/scannertraking/scannertraking.module').then( m => m.ScannertrakingPageModule)
  },
  {
    path: 'canjear',
    loadChildren: () => import('./canjear/canjear.module').then( m => m.CanjearPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
