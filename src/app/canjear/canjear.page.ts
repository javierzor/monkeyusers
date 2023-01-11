import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
 import { VariosService } from '../service/varios.service';

@Component({
  selector: 'app-canjear',
  templateUrl: './canjear.page.html',
  styleUrls: ['./canjear.page.scss'],
})
export class CanjearPage implements OnInit {

  secretKey = "123456&Descryption";
  profileInfo: any = null;

  
  constructor(
    public varios: VariosService,
    private router: Router,
    ) { }


    ionViewWillEnter(){
      this.AlogearDiferenteTipoCuenta();
      console.log('1');
    }
  

  ngOnInit() {
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
            this.router.navigate(['login']);
          }
        });


    }
    else{
       this.router.navigate(['login']);
    }



}



  irainicio(){
    this.router.navigate(['/users/inicio']);
  }

  cerrarsesion(){
    localStorage.clear();
    this.router.navigate(['/login']);

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
