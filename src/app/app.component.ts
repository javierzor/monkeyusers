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

      this.ActivarObservableDeBotonAtras();


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
       this.varios.SacarAlLogin();
    }


    }
    else{
       this.varios.SacarAlLogin();
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

SeClickeoEnLaApp(){
  console.log('event:',event);
  console.log('this.router.url=', this.router.url);
  // Ahora que sabemos a que ruta quiere ir, vamos a restringir las que requieran login pero a nivel Global.
  //para esto, agregemos el nombre de la ruta y si esta aparece en esta lista BLANCA "(no)" volvera a atras, ni se le mostrara
  //el modal el cual le indicara al usuario que debe iniciar sesion o regresar:
  console.log('activate');
  this.varios.BorrarHistorialNoBackButtonWPAExploradoresBrowser();
}


onActivateRoute(event) {
this.varios.MostrarYOcultarAlertaMono2segundos();
}
  
 


}
