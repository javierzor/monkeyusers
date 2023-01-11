import { Component } from '@angular/core';
import { VariosService } from './service/varios.service';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  secretKey = "123456&Descryption";
  subscription: any;

  profileInfo: any;
  constructor(
    public alertController: AlertController,
    public varios: VariosService,
    private router: Router,
    private platform: Platform,
  ) 
  
  {
    this.ionViewWillEnter();
  }



ionViewWillEnter(){

  this.profileInfo=localStorage.getItem('profileInfo');
  if(this.profileInfo){
    this.profileInfo=this.decrypt(this.profileInfo);
    this.profileInfo=JSON.parse(this.profileInfo);
    if(this.profileInfo&&this.profileInfo.id){

      console.log('profileInfo',this.profileInfo);
      var datamonkeyusersupdateporid = {
        nombre_solicitud:'monkeyusersupdateporid',
        id:this.profileInfo.id
      }
      this.varios.variasfunciones(datamonkeyusersupdateporid).subscribe(async( res: any ) =>{
        console.log(' respuesta monkeyusersupdateporid ',res);
        localStorage.setItem('profileInfo', this.encrypt(JSON.stringify(res)));
        // se considera un update de logeo exitoso
        // a continuacion el usuario existe y se actualizo
        });
    }
    else{
       this.router.navigate(['login']);
    }


    }
    else{
       this.router.navigate(['login']);
    }


}

ActivarObservableDeBotonAtras(){
  this.subscription = this.platform.backButton.subscribeWithPriority(9999, async () => {
    // do nothing
    const alert = await this.alertController.create({
      header: 'Esta seguro que quiere salir?',
      cssClass: 'cerrarsalir-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
          handler: () => {
             // do nothing
          },
        },
        {
          text: 'Si',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.router.navigate(['/login']);

          },
        },
      ],
    });
    await alert.present();

    


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
