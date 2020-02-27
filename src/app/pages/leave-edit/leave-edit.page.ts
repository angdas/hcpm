import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/providers/dataService/data.service';

import { AxService } from 'src/app/providers/axservice/ax.service';
import { LeaveAppTableContract } from 'src/app/models/leave/leaveAppTableContact.interface';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { LeaveAppLineContract } from 'src/app/models/leave/leaveAppLineContract.interface';
@Component({
  selector: 'app-leave-edit',
  templateUrl: './leave-edit.page.html',
  styleUrls: ['./leave-edit.page.scss'],
})
export class LeaveEditPage implements OnInit {

  leaveApp: LeaveAppTableContract = {} as LeaveAppTableContract;
  sub: any;
  editable: boolean;
  pageType: any;

  resupmtion:boolean;
  resumptionUpdated:boolean;

  constructor(public dataService: DataService, public axService: AxService, public router: Router, private activateRoute: ActivatedRoute,
    public alertController: AlertController, public loadingController: LoadingController) {

    this.pageType = this.activateRoute.snapshot.paramMap.get('pageType');
  }

  ngOnInit() {
    this.sub = this.dataService.getLeaveEditDetails$.subscribe(res => {
      console.log(res);
      this.leaveApp = res;
      this.editable = this.leaveApp.IsEditable;

      if (this.leaveApp.Status.toUpperCase() == "APPROVED") {
        this.resupmtion = this.leaveApp.ResumptionInitiated
      }
    });
  }

  ngOnDestroy() {
    if(this.resupmtion){
      if(!this.resumptionUpdated){
        this.leaveApp.ResumptionInitiated = false;
      }
    }
    this.sub.unsubscribe();
  }

  saveLeave() {
    this.updateLeaveDetails();
  }

  dateSel(leaveLine:LeaveAppLineContract,date,i) {
    // if(i==1){
    //    leaveLine.StartDate = new Date(date).toLocaleDateString()
    // }else if(i==2){
    //   leaveLine.ActualStartDate = new Date(date).toLocaleDateString()
    // }else if(i==3){
    //   leaveLine.EndDate = new Date(date).toLocaleDateString()
    // }else{
    //   leaveLine.ActualEndDate = new Date(date).toLocaleDateString()
    // }
  }
  async updateLeaveDetails() {
    const loading = await this.loadingController.create({
      spinner: "lines",
      duration: 3000,
      message: 'Please wait...',
    });
    await loading.present();

    this.axService.updateEmplLeaveAppl(this.leaveApp).subscribe(res => {
      loading.dismiss();
      console.log(res);
      
      if (!res) {
        this.presentAlert("Error", "Connection error")
      } else {
        if(this.resupmtion){
          this.resumptionUpdated = true;
        }
        this.presentAlert("Success", "Leave Saved Successfully").then(() => {
          if (this.pageType == "manager") {
            this.router.navigateByUrl("/tab/tabs/manager-profile/manager_leave_home/manager");
          } else {
            this.router.navigateByUrl("leave-home");
          }
        })
      }
    }, error => {
      this.presentAlert("Error", "Error While Updating Leave");
    })
  }

  async presentAlert(header, msg) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: ['OK']
    });

    return await alert.present();
  }

}
