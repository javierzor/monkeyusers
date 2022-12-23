import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { VariosService } from '../service/varios.service';
import * as CryptoJS from 'crypto-js';
import {Html5Qrcode,Html5QrcodeScanner,Html5QrcodeSupportedFormats,Html5QrcodeScannerState,Html5QrcodeScanType} from "html5-qrcode";
import { MenuController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-verificarproducto',
  templateUrl: './verificarproducto.page.html',
  styleUrls: ['./verificarproducto.page.scss'],
})
export class VerificarproductoPage implements OnInit {
  step:string = '1';
  codigo:string = null;
  secretKey = "123456&Descryption";

  //codigos del escaner
  escaneoesarray: boolean = false;
  camaras: any;
  html5QrCode222: Html5Qrcode;
  llavesdelescaneo: string[];
  objetoprincipal: any;
  profileInfo: any;
  //termina codigos del escaner

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private variosservicios: VariosService,
    private alertController: AlertController,
  ) { }


  ngOnInit() {

  }


  async escanearQRDeTrakig(indexdecamara) {


    const alert = await this.alertController.create({
    header: 'Acceso al Sistema de Camaras',
    subHeader: 'Porfavor enfoque un codigo',
    message: 'Para mejoras en la calidad de escaneo porfavor, descarrque la app en https://play.google.com/store/apps/details?id=com.ubercab&hl=es',
    buttons: ['Ingresar']
  });

  await alert.present();

  this.step='2';

  if(this.html5QrCode222){
      this.html5QrCode222.stop();
  }

  Html5Qrcode.getCameras().then(devices => {
    /**
     * devices would be an array of objects of type:
     * { id: "id", label: "label" }
     */
    if (devices && devices.length) {
        this.camaras = devices;
        var cameraId = devices[indexdecamara].id;
    
      // .. use this to start scanning.
      console.log('cameraId', cameraId);
      const config = { 
        fps: 10, 
        qrbox: { width: 350, height: 350 } ,
        // formatsToSupport: [ 
        //   Html5QrcodeSupportedFormats.QR_CODE,
        //   Html5QrcodeSupportedFormats.AZTEC,
        //   Html5QrcodeSupportedFormats.CODABAR,
        //   Html5QrcodeSupportedFormats.CODE_39,
        //   Html5QrcodeSupportedFormats.CODE_93,
        //   Html5QrcodeSupportedFormats.CODE_128,
        //   Html5QrcodeSupportedFormats.DATA_MATRIX,
        //   Html5QrcodeSupportedFormats.MAXICODE,
        //   Html5QrcodeSupportedFormats.ITF,
        //   Html5QrcodeSupportedFormats.EAN_13,
        //   Html5QrcodeSupportedFormats.EAN_8,
        //   Html5QrcodeSupportedFormats.PDF_417,
        //   Html5QrcodeSupportedFormats.RSS_14,
        //   Html5QrcodeSupportedFormats.RSS_EXPANDED,
        //   Html5QrcodeSupportedFormats.UPC_A,
        //   Html5QrcodeSupportedFormats.UPC_E,
        //   Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
        // ]
      };

      this.html5QrCode222 = new Html5Qrcode(/* element id */ "reader");
      this.html5QrCode222.start(
        cameraId, 
        config,

        (decodedText, decodedResult) => {
          // do something when code is read
          console.log('decodedText',decodedText);
          console.log('decodedResult',decodedResult);
          console.log('decodedText.split (":")', decodedText.split (":"));

          if(decodedText){

            // XDXD
            if(typeof decodedText != 'string'){
              //Codigo para QR Que son Arrays XD XD 

              this.escaneoesarray=true;

              this.objetoprincipal= decodedText;
              this.llavesdelescaneo = Object.keys(this.objetoprincipal);

            

          }
          else{
              //Codigo para qr que son string es decir numeros, letras individualesW
              
              this.escaneoesarray=false;

              this.codigo=decodedText;
              this.html5QrCode222.stop().then((ignore) => {
                // QR Code scanning is stopped.
                this.step='1';
                this.html5QrCode222=null;
                }).catch((err) => {
                  // Stop failed, handle it.
                });


            }


          }





        },
        (errorMessage) => {
          // parse error, ignore it.
        })
      .catch((err) => {
        // Start failed, handle it.
        console.log('err del catch', err);
      });



      
    }
  }).catch(err => {
    // handle err
            console.log('error', err);

  });



}

  async verificarproducto(){


  const actualizando = await this.loadingController.create({
    message: 'Verificando',
    duration: 12000,
    spinner: "lines",
    cssClass:'custom-loader-class'
    });
    actualizando.present();


  this.profileInfo=localStorage.getItem('profileInfo');
  this.profileInfo=this.decrypt(this.profileInfo);
  this.profileInfo=JSON.parse(this.profileInfo);
  
  var datamonkeyusersverificarproducto = {
    nombre_solicitud: 'monkeyusersverificarproducto',
    id_user: this.profileInfo.id,
    codigo:this.codigo
  }

  this.variosservicios.variasfunciones(datamonkeyusersverificarproducto).subscribe(async( res: any ) =>{
    actualizando.dismiss();
    console.log(' respuesta monkeyusersverificarproducto ',res);
    if(res){
      if(res.ganancia_individual){
        this.variosservicios.presentToast('Ganaste:' + res.ganancia_individual + 'Puntos!');
        const alert = await this.alertController.create({
          header: 'Felicidades acaba de ganar Monkey Points',
          subHeader: 'Ganaste'+res.ganancia_individual+'Monkey Points',
          message: 'Verifica mass codigos para ganar más Monkey Points!',
          buttons: ['Ok!']
        });
      
        await alert.present();


      }
    }

    else {
      this.variosservicios.presentToast('Codigo incorrecto o usado!')
    }
  });

}

  irainicio(){
    this.router.navigate(['/inicio']);
  }


  encrypt(value : string) : string{
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }
  
  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

}
