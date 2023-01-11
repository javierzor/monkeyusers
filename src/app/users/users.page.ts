import { Component, OnInit } from '@angular/core';
import { VariosService } from '../service/varios.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  constructor(
    public varios: VariosService,

  ) { }

  ngOnInit() {
  }


  cerrarsesion(){
    this.varios.logout();
  }


}
