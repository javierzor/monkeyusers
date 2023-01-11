import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { VariosService } from '../service/varios.service';
import { PaisesService } from '../service/paises.service';
import {Router} from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{


  constructor(
    private location: Location,
    private router: Router,
    private variosservicios: VariosService,
    private paises: PaisesService,
    private menu: MenuController,
    private route: ActivatedRoute,

  ) 
  
  {

  }


  ngOnInit(){

  }


}