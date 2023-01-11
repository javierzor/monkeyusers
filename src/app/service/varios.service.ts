import { Injectable } from '@angular/core';
import { ToastController, LoadingController, ModalController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class VariosService {
  secretKey = "123456&Descryption";

  isLoading = false;
  tipo_cuenta:any;
  activar_realtime_paqueteria: boolean = false;
  activar_realtime_resumen_home: boolean = false;
  activar_realtime_user_conversaciones: boolean = false;
  activar_realtime_admin_conversaciones: boolean = false;
  activar_real_time_modal_ver_conversacion_chat: boolean = false;

  ir_a_registro: string='registro';
  profileInfo: any;
  loadingmono: HTMLIonLoadingElement;
  constructor(
    private router: Router,
    public toastController: ToastController,
    private loadingController: LoadingController,
    private http: HttpClient
  ) 
  {

  }

  variasfunciones(data: any)
  {
  var url = 'https://equipojotamar.com/backend/public/api/variasfunciones';
  return this.http.post(url,data,
  {headers:new HttpHeaders({"Content-Type":'application/json'})});
  }

  
  
  precioscrypto(data){
    var url = 'https://min-api.cryptocompare.com/data/v2/histominute';
    return this.http.post(url,data,
    {headers:new HttpHeaders({"Content-Type":'application/json'})});

    
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async loading2segundos(mensaje) {
    const actualizando = await this.loadingController.create({
      message: mensaje,
      duration: 1500,
      spinner: "lines",
      cssClass:'custom-loader-class'
      });
      actualizando.present();
    
  }

  async loading1segundos(mensaje) {
    const loadingunsegundo = await this.loadingController.create({message: mensaje,duration: 1000,spinner: "lines",
      cssClass:'custom-loader-class'
      });
      loadingunsegundo.present();
    
  }

  async quitarloading(){
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

  async loading18segundos(mensaje) {
    this.isLoading = true;
    return await this.loadingController
      .create({
        duration: 18000,
        spinner: "lines",
        message: mensaje,
        cssClass:'custom-loader-class'
      })
      .then(a => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => {});
          }
        });
      });
  }
  
  funciondeRETRASAR(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

logout(){
  history.pushState(null, document.title, location.href);
  window.addEventListener('popstate', function (event)
  {
    history.pushState(null, document.title, location.href);
  });
  localStorage.clear();
  this.router.navigate(['login']);
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

async MostrarYOcultarAlertaMono(loadingodismiss) {
  
  if(loadingodismiss=='present'){
    this.loadingmono = await this.loadingController.create({
      duration: 10000,
      message: '<ion-img src="assets/monkeyusers/gif/gif-bad-monkey-v2.gif" alt="loading..."></ion-img>',
      cssClass: 'loading-del-mono',
      spinner: null,
    });
    this.loadingmono.present();
  }
  else{
    // loadingmono.present();

    setTimeout(() => 
    {
      this.loadingmono.dismiss();
      this.loadingmono=null;
    },
    500);


  }

}

async MostrarYOcultarAlertaMono2segundos() {
    this.loadingmono = await this.loadingController.create({
      duration: 1500,
      message: '<ion-img src="assets/monkeyusers/gif/gif-bad-monkey-v2.gif" alt="loading..."></ion-img>',
      cssClass: 'loading-del-mono',
      spinner: null,
    });
    this.loadingmono.present();
}


BorrarHistorialNoBackButtonWPAExploradoresBrowser(){
  history.pushState(null, document.title, location.href);
  window.addEventListener('popstate', function (event)
  {
    history.pushState(null, document.title, location.href);
  });
}

SacarAlLogin(){
  this.MostrarYOcultarAlertaMono2segundos();
  this.BorrarHistorialNoBackButtonWPAExploradoresBrowser();
  this.logout();
  
}


}
