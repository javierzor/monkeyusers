import { Component } from '@angular/core';
import { VariosService } from './service/varios.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  secretKey = "123456&Descryption";

  profileInfo: any;
  constructor(
    private varios: VariosService,

  ) 
  
  {
    this.ionViewWillEnter();
  }


  ionViewWillEnter(){
    this.profileInfo=localStorage.getItem('profileInfo');
    if(this.profileInfo){
      this.profileInfo=this.decrypt(this.profileInfo);
      this.profileInfo=JSON.parse(this.profileInfo);
      console.log('profileInfo',this.profileInfo)
      var datamonkeyusersupdateporid = {
        nombre_solicitud:'monkeyusersupdateporid',
        id:this.profileInfo.id
      }
      this.varios.variasfunciones(datamonkeyusersupdateporid).subscribe(async( res: any ) =>{
        console.log(' respuesta monkeyusersupdateporid ',res);
          localStorage.setItem('profileInfo', this.encrypt(JSON.stringify(res)));
        });
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
  
 


}
