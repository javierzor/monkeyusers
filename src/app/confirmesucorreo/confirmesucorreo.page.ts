import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { VariosService } from '../service/varios.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-confirmesucorreo',
  templateUrl: './confirmesucorreo.page.html',
  styleUrls: ['./confirmesucorreo.page.scss'],
})
export class ConfirmesucorreoPage implements OnInit {
  codigogenerado;
  secretKey = "123456&Descryption";

  // OTP: any = { first: '', second: '', third: '', forth: '', fifth: '', sixth: '' }; 
  OTP: any =  {
    first: '',
    second: '',
    third: '',
    forth: '',
    fifth: '',
    sixth: ''
  };

  correoaenviar: string;
  jugador_o_soporte: any;
  profileInfo: any;

  constructor(
    private varios: VariosService,
    private router: Router

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.GenerarCodigoAleatorioFuncion();
    this.profileInfo=localStorage.getItem('profileInfo');
    this.profileInfo=this.decrypt(this.profileInfo);
    this.profileInfo=JSON.parse(this.profileInfo);
    this.correoaenviar=this.profileInfo.email;
    this.EnviarMailPorCreacionDeTicket();
    this.siestipo1paraellogin();
  }

  siestipo1paraellogin(){
    this.profileInfo=localStorage.getItem('profileInfo');
    this.profileInfo=this.decrypt(this.profileInfo);
    this.profileInfo=JSON.parse(this.profileInfo);
    console.log('profileinfo',this.profileInfo);
    if(this.profileInfo.tipo_cuenta=='1'){
      this.router.navigate(['/home']);

    }
  }

  GenerarCodigoAleatorioFuncion(){
    
    // const characters ='123456';
    this.codigogenerado= Math.floor(Math.random() * 899999 + 100000)
    console.log('this.codigogenerado',this.codigogenerado);
  }

  async EnviarMailPorCreacionDeTicket(){

    var strdedia = new Date();
    var datestring = strdedia.toString();

    console.log('intentando verificar,', this.correoaenviar, 'a las', datestring);

    var databeoboxenviaremailticket = {
      nombre_solicitud: 'monkeyusersenviarcorreoverificarcorreo',
      correoaenviar: this.correoaenviar,
      datestring: datestring,
      codigo_verificacion: this.codigogenerado
    }
    console.log('data a enviar',databeoboxenviaremailticket);
    this.varios.variasfunciones(databeoboxenviaremailticket).subscribe(async( res: any ) =>{
      console.log('respuesta de beoboxenviaremailticket', res);
      });

    }


  async boton_verifica(){
  this.varios.presentToast('Verificando...');
  console.log('Redirige a ocupaciones deporte y tipo de cuenta', this.OTP.first+this.OTP.second+this.OTP.third+this.OTP.forth+this.OTP.fifth+this.OTP.sixth);
  if(this.OTP.first+this.OTP.second+this.OTP.third+this.OTP.forth+this.OTP.fifth+this.OTP.sixth==this.codigogenerado){
    this.profileInfo=localStorage.getItem('profileInfo');
    this.profileInfo=this.decrypt(this.profileInfo);
    this.profileInfo=JSON.parse(this.profileInfo);


    var datamonkeyusersupdateverify = {
    nombre_solicitud:'monkeyusersupdateverify',
    id: this.profileInfo.id,
    };   
    this.varios.variasfunciones(datamonkeyusersupdateverify).subscribe(async (res: any ) =>{
    console.log('respuesta monkeyusersupdateverify, res',res);
    //si la respuesta del insert es ==1 rediridige a ocupacionescompletesuregistro
    // pero con las sig condiciones:

    if  (res=1)
    {
      this.profileInfo=localStorage.getItem('profileInfo');
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
          this.varios.presentToast('Verificación Exitosa!');
          this.router.navigate(['/inicio']);
        });



    }

    
  });


  }
  else{
    await this.varios.funciondeRETRASAR(3000);
    this.varios.presentToast('Codigo invalido');

  }
  }

  reenviarcorreo(){
    this.varios.presentToast('Correo reenviado!');
    this.ionViewWillEnter();
  }


  otpController(event,next,prev, index){


    if(index == 6) {
      console.log("submit");
      this.boton_verifica();
    }
    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
     return 0;
    } 
 }

 borrar1(event){
  this.OTP.first='';
 }
 borrar2(event){
  this.OTP.second='';
 }
 borrar3(event){
  this.OTP.third='';
 }
 borrar4(event){
  this.OTP.forth='';
 }
 borrar5(event){
  this.OTP.fifth='';
 }
 borrar6(event){
  this.OTP.sixth='';
 }





 encrypt(value : string) : string{
  return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
}

decrypt(textToDecrypt : string){
  return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
}



}


