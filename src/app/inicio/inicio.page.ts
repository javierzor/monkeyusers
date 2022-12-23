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
    private variosservicios: VariosService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.traerperfilenhome();
  }


  cerrarsesion(){
    localStorage.clear();
    this.router.navigate(['/home']);

  }
  
  iraverificarproducto(){
    this.router.navigate(['/verificarproducto']);
  }

  iracanjear(){
    this.router.navigate(['/canjear']);
  }




  traerperfilenhome(){
    this.profileInfo=localStorage.getItem('profileInfo');
    this.profileInfo=this.decrypt(this.profileInfo);
    this.profileInfo=JSON.parse(this.profileInfo);
    console.log('profileinfo en HOME',this.profileInfo);
    if(this.profileInfo.tipo_cuenta<1){
      this.router.navigate(['/home']);

    }
    this.consultarpuntos();

  }
  consultarpuntos(){
    var datamonkeyuserstraermonkeycoinspuntosdeusuario = {
      nombre_solicitud: 'monkeyuserstraermonkeycoinspuntosdeusuario',
      id_user:this.profileInfo.id
    }
    this.variosservicios.variasfunciones(datamonkeyuserstraermonkeycoinspuntosdeusuario).subscribe(async( res: any ) =>{
      console.log(' respuesta monkeyuserstraermonkeycoinspuntosdeusuario ',res);
      this.puntos=res;
    });
      
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

  


}
