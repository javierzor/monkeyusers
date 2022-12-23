import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-canjear',
  templateUrl: './canjear.page.html',
  styleUrls: ['./canjear.page.scss'],
})
export class CanjearPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }


  irainicio(){
    this.router.navigate(['/inicio']);
  }


}
