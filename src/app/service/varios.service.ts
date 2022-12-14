import { Injectable } from '@angular/core';
import { ToastController, LoadingController, ModalController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VariosService {

  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    private loadingController: LoadingController,
    private http: HttpClient


  ) { }



  variasfunciones(data: any)
  {
  var url = 'https://nube.gq/api/variasfunciones';
  return this.http.post(url,data,
  {headers:new HttpHeaders({"Content-Type":'application/json'})});
  }



  
}
