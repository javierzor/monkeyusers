import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { VariosService } from '../service/varios.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  secretKey = "123456&Descryption";
  profileInfo:any;
  puntos:any; 
  constructor(
    public varios: VariosService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.traerperfilenhome();
    this.AlogearDiferenteTipoCuenta();

  }




  AlogearDiferenteTipoCuenta(){
    this.profileInfo=localStorage.getItem('profileInfo');
  if(this.profileInfo){
    this.profileInfo=this.decrypt(this.profileInfo);
    this.profileInfo=JSON.parse(this.profileInfo);
      if(this.profileInfo&&this.profileInfo.id)
      console.log('profileInfo  PERO EN VISTA Alogear ',this.profileInfo);
      var datamonkeyusersupdateporid = {
        nombre_solicitud:'monkeyusersupdateporid',
        id:this.profileInfo.id
      }
      this.varios.variasfunciones(datamonkeyusersupdateporid).subscribe(async( res: any ) =>{
        console.log(' respuesta monkeyusersupdateporid PERO EN VISTA Alogear ',res);
          localStorage.setItem('profileInfo', this.encrypt(JSON.stringify(res)));
          if(res.tipo_cuenta<1){
            this.varios.SacarAlLogin();
          }
        });


    }
    else{
       this.varios.SacarAlLogin();
    }



}

encrypt(value : string) : string{
  if(value){
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }
}

decrypt(textToDecrypt : string){
  if(textToDecrypt){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}




  cerrarsesion(){
    localStorage.clear();
    this.router.navigate(['/login']);

  }
  
  iraverificarproducto(){
    this.router.navigate(['/users/verificarproducto']);
  }

  iracanjear(){
    this.router.navigate(['/users/canjear']);
  }




  traerperfilenhome(){
    this.profileInfo=localStorage.getItem('profileInfo');
    this.profileInfo=this.decrypt(this.profileInfo);
    this.profileInfo=JSON.parse(this.profileInfo);
    console.log('profileinfo en HOME',this.profileInfo);
    if(this.profileInfo.tipo_cuenta<1){
      this.router.navigate(['/login']);

    }
    this.consultarpuntos();

  }
  consultarpuntos(){
    var datamonkeyuserstraermonkeycoinspuntosdeusuario = {
      nombre_solicitud: 'monkeyuserstraermonkeycoinspuntosdeusuario',
      id_user:this.profileInfo.id
    }
    this.varios.variasfunciones(datamonkeyuserstraermonkeycoinspuntosdeusuario).subscribe(async( res: any ) =>{
      console.log(' respuesta monkeyuserstraermonkeycoinspuntosdeusuario ',res);
      this.puntos=res;
    });
      
  }
  





}
