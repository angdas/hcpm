import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/providers/dataService/data.service';
import { ParameterService } from 'src/app/providers/parameterService/parameter.service';

import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { TimesheetProject } from 'src/app/models/timesheet/tsProject.interface';
import { TimesheetActivity } from 'src/app/models/timesheet/tsActivity.interface';

import { AxService } from 'src/app/providers/axservice/ax.service';
import { PopoverController } from '@ionic/angular';
import { TimesheetCategory } from 'src/app/models/timesheet/tsCategory.interface';
import { CommentPage } from './comment/comment.page';
import { Location } from '@angular/common';
import { TimesheetTableContact } from 'src/app/models/timesheet/tsTableContract.interface';
import { TimesheetPeriodDate } from 'src/app/models/timesheet/tsPeriodDate.interface';
import { TimesheetLine } from 'src/app/models/timesheet/tsLineListContact.interface';
@Component({
  selector: 'app-timesheet-add',
  templateUrl: './timesheet-add.page.html',
  styleUrls: ['./timesheet-add.page.scss'],
})

export class TimesheetAddPage implements OnInit {
  timesheetPeriodList: TimesheetPeriodDate[] = [];
  newTimesheet: TimesheetTableContact = {} as TimesheetTableContact;
  newLine: TimesheetLine = {} as TimesheetLine;

  timesheetList: TimesheetTableContact[] = [];

  tsProject: TimesheetProject[] = [];
  tsCategory: TimesheetCategory[] = [];
  tsActivity: TimesheetProject[] = [];

  projectActivityList: TimesheetProject[] = [];

  sub: any;
  sub0: any;
  sub1: any;


  pageType: any;

  tsLineAdd: boolean;
  constructor(public dataService: DataService, public paramService: ParameterService, public router: Router,
    public alertController: AlertController, public toastController: ToastController, public axService: AxService,
    public popoverController: PopoverController, public loadingController: LoadingController, private activateRoute: ActivatedRoute,
    private location: Location) {

    this.pageType = this.activateRoute.snapshot.paramMap.get('pageType');

  }


  ngOnInit() {
    this.getProjectList();
  }


  ionViewWillEnter() {
    this.getnewLineData();
  }

  getnewLineData() {
    this.sub0 = this.dataService.getTimesheetList$.subscribe(res => {
      console.log(res);
      this.timesheetList = res;
    });

    this.sub1 = this.dataService.getTimesheetPeriodList$.subscribe(res => {
      this.timesheetPeriodList = res;

    })

  }
  ngOnDestroy() {
    if (this.tsLineAdd) {
      this.sub.unsubscribe();
      this.newLine = {} as TimesheetLine;
      this.newTimesheet = {} as TimesheetTableContact;
    }
    this.sub1.unsubscribe();
    this.sub0.unsubscribe();
  }


  projSelected(event) {
    var project = event.detail.value;

    this.newLine.ProjId = project.ProjId;
    this.newLine.ProjDescription = project.ProjDescription;

    this.tsActivity = [];
    this.getActivityList(project);
  }

  activitySelected(event) {
    var activity = event.detail.value;
    console.log(activity)
    this.newLine.ProjActivityId = activity.ProjActivityId;
    this.newLine.ProjActivityDescription = activity.ProjActivityDescription;
  }

  getProjectList() {
    this.axService.getWorkerTimesheetProject(this.paramService.emp.WorkerId).subscribe(res => {
      this.projectActivityList = res;
      console.log(res);
      var unique = {}
      for (var i = 0; i < this.projectActivityList.length; i++) {
        var place = this.projectActivityList[i];
        unique[place.ProjId] = place;
      }
      for (var name in unique) {
        var place = unique[name];
        let project: TimesheetProject = {} as TimesheetProject;

        project.ProjId = place.ProjId;
        project.ProjDescription = place.ProjDescription;

        this.tsProject.push(project);
      }
    }, (error) => {
      console.log('Error - get worker project details: ' + error);
    })
  }
  getActivityList(tsProject: TimesheetProject) {

    for (var i = 0; i < this.projectActivityList.length; i++) {
      if (tsProject.ProjId == this.projectActivityList[i].ProjId) {
        this.tsActivity.push(this.projectActivityList[i]);
      }
    }
  }

  async presentPopover(ev: any, hours, internalComment, externalComment, i) {
    ev = {
      target: {
        getBoundingClientRect: () => {
          return {
            top: 50
          };
        }
      }
    };
    const popover = await this.popoverController.create({
      component: CommentPage,
      componentProps: {
        "Hours": hours,
        "InternalComment": internalComment,
        "ExternalComment": externalComment
      },
      event: ev,
      translucent: true
    });

    popover.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        if (i == 1) {
          this.newLine.Hours1 = Number(dataReturned.data[0]);
          this.newLine.InternalComment1 = dataReturned.data[1];
          this.newLine.ExternalComment1 = dataReturned.data[2];
        } else if (i == 2) {
          this.newLine.Hours2 = Number(dataReturned.data[0]);
          this.newLine.InternalComment2 = dataReturned.data[1];
          this.newLine.ExternalComment2 = dataReturned.data[2];
        } else if (i == 3) {
          this.newLine.Hours3 = Number(dataReturned.data[0]);
          this.newLine.InternalComment3 = dataReturned.data[1];
          this.newLine.ExternalComment3 = dataReturned.data[2];
        } else if (i == 4) {
          this.newLine.Hours4 = Number(dataReturned.data[0]);
          this.newLine.InternalComment4 = dataReturned.data[1];
          this.newLine.ExternalComment4 = dataReturned.data[2];
        } else if (i == 5) {
          this.newLine.Hours5 = Number(dataReturned.data[0]);
          this.newLine.InternalComment5 = dataReturned.data[1];
          this.newLine.ExternalComment5 = dataReturned.data[2];
        } else if (i == 6) {
          this.newLine.Hours6 = Number(dataReturned.data[0]);
          this.newLine.InternalComment6 = dataReturned.data[1];
          this.newLine.ExternalComment6 = dataReturned.data[2];
        } else if (i == 7) {
          this.newLine.Hours7 = Number(dataReturned.data[0]);
          this.newLine.InternalComment7 = dataReturned.data[1];
          this.newLine.ExternalComment7 = dataReturned.data[2];
        }
      }
    });

    popover.style.cssText = '--min-width: 85%;--border-radius:5px';
    return await popover.present();
  }
  openComment(event, hours, internalComment, externalComment, i) {
    this.presentPopover(event, hours, internalComment, externalComment, i);
  }

  saveTimesheet() {
    if (this.validator()) {
      if (this.pageType == "lineAdd") {
        this.sub = this.dataService.gettimesheetAddLine$.subscribe((res: TimesheetTableContact) => {
          res.TimesheetLine.push(this.newLine);
          this.tsLineAdd = true;
          this.newTimesheet = res;
          this.updateTimesheet();
        })

      } else {
        this.newTimesheet.Number = 0;
        this.newTimesheet.IsEditable = true;
        this.newTimesheet.WorkerId = this.paramService.emp.WorkerId;
        this.newTimesheet.TimesheetLine = [];
        this.newTimesheet.TimesheetCode = "";
        this.newTimesheet.Status = "CREATED";

        this.newTimesheet.PeriodFrom = this.timesheetPeriodList[0].PeriodDate;
        this.newTimesheet.PeriodTo = this.timesheetPeriodList[6].PeriodDate;

        this.newTimesheet.TimesheetLine.push(this.newLine);
        this.updateTimesheet();
      }

    }
  }

  async updateTimesheet() {
    const loading = await this.loadingController.create({
      spinner: "lines",
      duration: 3000,
      message: 'Please wait...',

    });
    await loading.present();

    this.axService.updateWorkerTimesheet(this.newTimesheet).subscribe(res => {

      if (res) {
        if (!this.tsLineAdd) {
          this.newTimesheet.IsEditable = true;
          this.timesheetList.push(this.newTimesheet);
        }

        this.axService.getWorkerTimesheet(this.paramService.emp.WorkerId, this.timesheetPeriodList[0].PeriodDate).subscribe(res => {
          console.log(res);
          this.timesheetList = res;
          this.dataService.setTimesheetList(this.timesheetList);
        }, (error) => {
          console.log(error);
        });

        // this.dataService.setTimesheetList(this.timesheetList);
      }
      loading.dismiss();
      this.presentAlertMessage();
    }, error => {
      loading.dismiss();
      this.errorToast("Connection Error");
    })
  }
  async presentAlertMessage() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Timesheet Updated Successfully',
      buttons: [
        {
          text: 'Ok',
          handler: (blah) => {
            this.location.back();
          }
        }
      ]
    });

    await alert.present();
  }


  validator() {
    if (!this.newLine.ProjId) {
      this.errorToast("Project Cannot Be blank");
    }
    else if (!this.newLine.ProjActivityId) {
      this.errorToast("Activity Cannot Be blank");
    }
    // else if (!this.newLine.CategoryId) {
    //   this.errorToast("Category Cannot Be blank");
    // }
    else {
      return true
    }
    return false;
  }
  async errorToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}
