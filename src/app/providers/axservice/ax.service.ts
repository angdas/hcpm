import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StorageService } from '../storageService/storage.service';
import { ParameterService } from '../parameterService/parameter.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { LoginModel } from 'src/app/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AxService {

  //public baseAddress: string = "https://ofm-devdevaos.sandbox.ax.dynamics.com";

  //AFZ ENV
  //public baseAddress = "https://hcpmwebapi.azurewebsites.net/";


  //OFM LIVE
  public baseAddress = "";


  //OFM ENV
  //public baseAddress= "https://hcpmapiofmuat.azurewebsites.net/";
  //public azureId = "https://ofm-devdevaos.sandbox.ax.dynamics.com";


  constructor(public http: HttpClient, private hTTP: HTTP,
    private storageservice: StorageService, private parameterservice: ParameterService) {

    if (!this.parameterservice.baseUrl) {
      storageservice.getAllValuesFromStorage.subscribe(res => { }, error => { },
        () => {
          this.baseAddress = this.parameterservice.baseUrl
        })
    } else {
      this.baseAddress = this.parameterservice.baseUrl
    }

  }
  GetClientConfig(clientCOnfig): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = "https://hcpmwebapi.azurewebsites.net/api/HCPM/GetClientConfig";
        let body = JSON.stringify(clientCOnfig);
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        console.log(body);
        service = this.http.post(url, body, httpOptions);

      }
    );
    return service;
  }
  validateToken$ = new Observable((observer) => {
    observer.next("completed");
    observer.complete();
    // if (this.parameterservice.tokenExpiryDateTime) {
    //   var expDate = new Date(this.parameterservice.tokenExpiryDateTime);

    //   var currDate = new Date();
    //   if (expDate < currDate) {
    //      this.createProxyUserToken.subscribe(res => {

    //     })
    //   }
    //   observer.next("completed");
    //   observer.complete();
    // } else {
    //   this.createProxyUserToken.subscribe(res => {
    //     observer.next("completed");
    //     observer.complete();
    //   })
    // }

  });


  userLogin(login: LoginModel) {
    let url = this.baseAddress + "api/HCPM/Login";
    let body = {
      "Id": login.Id,
      "Password": login.Password
    };
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json'
      })
    };
    console.log(JSON.stringify(body))
    return this.http.post(url, body, httpOptions);
  }
  GetERPConfig(): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        service = Observable.create((observer) => {
          let url = this.baseAddress + "api/HCPM/GetERPConfig";
          this.hTTP.setDataSerializer("utf8");
          this.hTTP.get(url, {}, { "Content-Type": "application/json" }).then(data => {
            observer.next(JSON.parse(data.data));
          }).catch(error => {
            observer.error(error);
          });
        });
      }
    );
    return service;
  }
  getWorkerDetails(user: string): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "api/HCPM/GetWorker";
        let body = { email: user };
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        service = this.http.post(url, body, httpOptions);
      }
    );
    return service;
  }
  getDocumentRequest(emp): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "/api/HCPM/GetHRRequest";
        let body = { "WorkerId": emp };
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        service = this.http.post(url, body, httpOptions);
      }
    );
    return service;
  }
  getWorkerPeriod(emp, period): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "/api/HCPM/GetWorkerTimesheetPeriod";
        let body = { "WorkerId": emp };
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        service = this.http.post(url, body, httpOptions);
      }
    );
    return service;
  }
  getPayslip(user, period): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "/api/HCPM/GetWorkerPayslip";
        let body = {
          "WorkerId": user,
          "PeriodStartDate": period.toLocaleDateString()
        };
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        console.log(JSON.stringify(body))
        service = this.http.post(url, JSON.stringify(body), httpOptions);
      }
    );
    return service;
  }


  getWorkerTimesheet(user: string, periodDate: Date): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "/api/HCPM/GetTimeSheet";
        let body = {
          "WorkerId": user,
          "Date": periodDate.toDateString()
        };
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        service = this.http.post(url, JSON.stringify(body), httpOptions);
      }
    );
    return service;

  }

  updateWorkerTimesheet(TimesheetTableContact): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "api/HCPM/UpdateTimeSheet";
        let body = JSON.stringify(TimesheetTableContact);
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        service = this.http.post(url, body, httpOptions);
      }
    );
    return service;
  }


  getLeaveDetails(email): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "api/HCPM/GetLeaveApplication";
        let body = { WorkerId: email };
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        service = this.http.post(url, body, httpOptions);

      }
    );
    return service;
  }

  getLeaveType(email, absDate = new Date()): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "api/HCPM/GetWorkerAbsenceBalance";
        let body = {
          "WorkerId": email,
          "AbsenceCode": "",
          "AbsenceDate": absDate
        };
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        service = this.http.post(url, body, httpOptions);
      }
    );
    return service;
  }

  updateEmplLeaveAppl(contract): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "api/HCPM/UpdateLeaveApplication";
        let body = JSON.stringify(contract);
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        service = this.http.post(url, body, httpOptions);

      }
    );
    return service;


  }

  getWorkerTimesheetProject(id): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "api/HCPM/GetWorkerProject";
        let body = { "WorkerId": id };
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        service = this.http.post(url, body, httpOptions);
      }
    );
    return service;
  }

  GetMyWorkersLeaveApprovals(empid): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "api/HCPM/GetLeaveApplicationApproval";
        let body = {
          "ApprovalId": empid
        }
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        service = this.http.post(url, JSON.stringify(body), httpOptions);

      }
    );
    return service;
  }

  UpdateLeaveApplicationStatusWorker(contract): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "api/HCPM/UpdateLeaveApplicationStatus";
        let body = JSON.stringify(contract);
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        console.log(body);
        service = this.http.post(url, body, httpOptions);

      }
    );
    return service;
  }

  GetMyWorkersTimesheetApprovals(empid): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "api/HCPM/GetTimesheetApproval";
        let body = {
          "ApprovalId": empid
        }
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        service = this.http.post(url, JSON.stringify(body), httpOptions);
      }
    );
    return service;
  }

  UpdateTSApplicationStatusWorker(contract): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "api/HCPM/UpdateTimesheetStatus";
        let body = JSON.stringify(contract);
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        console.log(body);
        service = this.http.post(url, body, httpOptions);

      }
    );
    return service;
  }

  GetMyWorkersDocRequest(workerId) {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "api/HCPM/GetHrRequestApproval";
        let body = {
          "ApprovalId": workerId
        }
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        console.log(JSON.stringify(body))
        service = this.http.post(url, JSON.stringify(body), httpOptions);
      }
    );
    return service;
  }

  UpdateHRRequestStatus(contract): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "api/HCPM/UpdateHRRequestStatus";
        let body = JSON.stringify(contract);
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        console.log(body);
        service = this.http.post(url, body, httpOptions);

      }
    );
    return service;
  }

  getDocRequestType(): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "api/HCPM/GetHrRequestType";
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        service = this.http.get(url);

      }
    );
    return service;
  }

  getDocumentRequestAddress(): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "api/HCPM/GetHrRequestAddress";
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        service = this.http.get(url);

      }
    );
    return service;
  }

  updateDocumentRequest(contact): Observable<any> {
    var service;
    this.validateToken$.subscribe(res => { }, error => { },
      () => {
        let url = this.baseAddress + "api/HCPM/UpdateHRRequest";
        let body = JSON.stringify(contact);
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'Application/json'
          })
        };
        service = this.http.post(url, body, httpOptions);

      }
    );
    return service;
  }


}
