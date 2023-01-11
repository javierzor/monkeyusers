import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsersPage } from './users/users.page';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'confirmesucorreo',
    loadChildren: () => import('./confirmesucorreo/confirmesucorreo.module').then( m => m.ConfirmesucorreoPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'users',
    component: UsersPage,
    children: [
   

      {
        path: 'inicio',
        loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
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

    ]
  },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
