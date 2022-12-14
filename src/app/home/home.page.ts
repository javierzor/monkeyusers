import { Component } from '@angular/core';
import { VariosService } from '../service/varios.service';

declare let JsBarcode: any;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  respuestamaltaadminobtenerlistadeuduarios: any;
  // JsBarcode: any;
  constructor(
    private variosservicios: VariosService,
    public varios: VariosService,
  ) 
  {
    
  }
  
  
  
  
  ionViewWillEnter(){

   
      JsBarcode(".barcode").init();
    this.traercodigosparacolocarencarta();
  }



  traercodigosparacolocarencarta(){

    this.respuestamaltaadminobtenerlistadeuduarios =  [
      {"encodings":"123456789012","code":"93","iso":"AF","id":1},
      {"encodings":"234234324234","code":"355","iso":"AL","id":2},
      {"encodings":"845654263454","code":"213","iso":"DZ","id":3},
    ]


    



    // var datamaltaadminobtenerlistadeuduarios = {
    //   nombre_solicitud: 'casemonkeymostradorbarrastemporal'
    // }
    //  this.variosservicios.variasfunciones(datamaltaadminobtenerlistadeuduarios).subscribe(async( res: any ) =>{
    //    console.log('respuesta de maltaadminobtenerlistadeuduarios', res);
    //    this.respuestamaltaadminobtenerlistadeuduarios=res;
    //  });

    //  console.log('this.respuestamaltaadminobtenerlistadeuduarios',this.respuestamaltaadminobtenerlistadeuduarios);

  }

  

}



