import { Events, NavController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParameterService } from 'src/app/providers/parameterService/parameter.service';
declare var $: any;
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  authenticated: boolean = false;
  constructor(public paramService: ParameterService, public events: Events,public router:Router) {
    this.events.subscribe('loggedOut', () => {
      this.authenticated = false;
    })

    this.events.subscribe('loggedin', () => {
      this.authenticated = true;
    })
  }
  ngOnInit() {
    this.authenticated = this.paramService.authenticated;
  }

  ionViewWillEnter() {
    this.authenticated = this.paramService.authenticated;
  }

  homeClicked(){
    this.router.navigateByUrl("/tab/tabs/manager-profile");
  }

  approvalClicked(){
    this.router.navigateByUrl("/tab/tabs/my-workers");
  }
}
