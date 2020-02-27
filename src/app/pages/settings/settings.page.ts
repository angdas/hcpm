import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuController, Events, IonInput } from '@ionic/angular';

import { StorageService } from 'src/app/providers/storageService/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParameterService } from 'src/app/providers/parameterService/parameter.service';
import { AxService } from 'src/app/providers/axservice/ax.service';

import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { ClientConfigModel } from 'src/app/models/ClientConfig.model';
import { AppVersion } from '@ionic-native/app-version/ngx';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  @ViewChild('clientId', { static: false }) clientIdInput: IonInput;
  clientConfig: ClientConfigModel = {} as ClientConfigModel;

  versionNumber: any;

  constructor(public paramServ: ParameterService, public router: Router, private storageService: StorageService, public axService: AxService,
    public events: Events, public alertController: AlertController, private activateRoute: ActivatedRoute, private appVersion: AppVersion,
    public loadingController: LoadingController) {


    this.appVersion.getVersionNumber().then(res=>{
      this.versionNumber = res;
    })
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.clientIdInput.setFocus();
  }

  async getClientUrl() {
    const loading = await this.loadingController.create({
      spinner: "lines",
      duration: 3000,
      message: 'Please wait...',
    });
    await loading.present();

    this.axService.GetClientConfig(this.clientConfig).subscribe((res: ClientConfigModel) => {
      console.log(res);
      loading.dismiss();
      this.axService.baseAddress = res.API;
      this.storageService.setURL(res.API);

      this.router.navigateByUrl("/login");
    }, error => {
      loading.dismiss();

    })
  }

  async presentAlertConfirmation() {
    const alert = await this.alertController.create({
      header: "Confirmation",
      message: "Are you sure you want to change environment?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {

          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alert.present();
  }
}
