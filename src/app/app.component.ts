import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ParameterService } from './providers/parameterService/parameter.service';
import { StorageService } from './providers/storageService/storage.service';
import { AxService } from './providers/axservice/ax.service';
import { MenuController } from '@ionic/angular';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { EmployeeModel } from './models/worker/worker.interface';
import { DataService } from './providers/dataService/data.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  backButtonSubscription:any;
  public appPages = [ ];
  authenticated: boolean = false;
  emp: EmployeeModel = {} as EmployeeModel;
  
  constructor(public router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen, private storageService: StorageService, private menuCtrl: MenuController,
    private statusBar: StatusBar, private parameterservice: ParameterService, public loadingController: LoadingController,
    public events: Events, public axService: AxService,public alertController: AlertController,public dataService:DataService
  ) {
    this.initializeApp(); 
    this.initializeStorageVariables();
    
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setMenuItems() {
    this.events.subscribe('loggedOut', () => {
      this.authenticated = false;
      this.menuCtrl.enable(false);
      this.appPages = [
        { title: 'Login', url: '', icon: 'home' },
        // { title: 'Settings', url: '/settings', icon: 'settings' },
      ];
    })
    this.events.subscribe('loggedin', () => {
      this.authenticated = true;
      this.menuCtrl.enable(true);
      this.appPages = [
        { title: 'Home', url: '/home', icon: 'home' },
        { title: 'Timesheet', url: '/timesheet-home', icon: 'time' },
        { title: 'Leave', url: '/leave-home', icon: 'briefcase' },
        { title: 'Payslip', url: '/payslip', icon: 'wallet' },
        { title: 'HR Request', url: '/document-request', icon: 'apps' },
        { title: 'Logout', url: '', icon: 'power' },
        // { title: 'Settings', url: '/settings', icon: 'settings' }
      ];
    });
  }

  openPage(page) {
    if (page != '' && page) {
      this.router.navigateByUrl(page)
    } else {
      this.logout();
    }
  }
  logout() {
    
    this.events.publish('loggedOut');
    this.parameterservice.authenticated = false;
    this.authenticated = false;
    this.storageService.setAuthenticated(false);
    this.storageService.setEmail("");
    this.storageService.setIsManager(false);
    this.menuCtrl.enable(false); 
    this.router.navigateByUrl("/login");


  }
 
  async initializeStorageVariables() {
    const loading = await this.loadingController.create({
      spinner: "lines",
      duration: 3000,
      message: 'Please wait...',
    });
    await loading.present();
    this.storageService.getAllValuesFromStorage.subscribe((data) => { }, (error) => { },
      () => {
        loading.dismiss();
        console.log(this.parameterservice)
        if(!this.parameterservice.baseUrl){
          this.presentErrorAlert("Please configure your environment");
            this.router.navigateByUrl("/settings");
        }else{
          if (this.parameterservice.authenticated) {
            this.axService.getWorkerDetails(this.parameterservice.email).subscribe(res => {
              this.emp = res;
              this.dataService.setMyDetails(this.emp);
              this.storageService.setUserDetails(this.emp);
  
              this.storageService.setIsManager(this.emp.IsManager);
              this.events.publish('loggedin');
              this.checkManager(this.emp.IsManager);
            }, error => {
              this.presentErrorAlert("Error Connecting To Server, Please Login Again");
              this.router.navigateByUrl("/login");
            })
          } else {
            this.events.publish('loggedOut');
            this.router.navigateByUrl("/login");
          }
          this.setMenuItems();
        }
       
      });
  }

  checkManager(res) {
    console.log(res);
    if (res) {
      this.menuCtrl.enable(false);
      this.router.navigateByUrl("/tab/tabs/manager-profile");
    } else {
      this.menuCtrl.enable(true); 
      this.router.navigateByUrl("/home");

    }
  }

  async presentErrorAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}

