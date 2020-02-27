import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';
import { ParameterService } from '../parameterService/parameter.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, private parameterservice: ParameterService) {
    console.log('Hello StorageserviceProvider Provider');
  }

  getAllValuesFromStorage = Observable.create((observer) => {
    let variables = 0;
   
    this.storage.get('hcpmAuthenticated').then((data) => {
      this.parameterservice.authenticated = data;
      observer.next(data);
      variables++;
      if(variables == this.parameterservice.totalStorageVariables) {
        observer.complete();
      }
    })
    this.storage.get('hcpmEmail').then((data) => {
      this.parameterservice.email = data;
      observer.next(data);
      variables++;
      if(variables == this.parameterservice.totalStorageVariables) {
        observer.complete();
      }
    })
    this.storage.get('hcpmToken').then((data) => {
      this.parameterservice.token = data;
      observer.next(data);
      variables++;
      if(variables == this.parameterservice.totalStorageVariables) {
        observer.complete();
      }
    })
    this.storage.get('hcpmTokenExpiryDateTime').then((data) => {
      this.parameterservice.tokenExpiryDateTime = data;
      observer.next(data);
      variables++;
      if(variables == this.parameterservice.totalStorageVariables) {
        observer.complete();
      }
    })
   
    this.storage.get('employee').then((data) => {
      this.parameterservice.emp = data;
      observer.next(data);
      variables++;
      if(variables == this.parameterservice.totalStorageVariables) {
        observer.complete();
      }
    })

    this.storage.get('hcpmIsManager').then((data) => {
      this.parameterservice.isManager = data;
      observer.next(data);
      variables++;
      if(variables == this.parameterservice.totalStorageVariables) {
        observer.complete();
      }
    })

    this.storage.get('hcpmErpConfig').then((data) => {
      this.parameterservice.erpConfig = data;
      observer.next(data);
      variables++;
      if(variables == this.parameterservice.totalStorageVariables) {
        observer.complete();
      }
    })

    this.storage.get('hcpmLoginCredentials').then((data) => {
      this.parameterservice.loginCredentials = data;
      observer.next(data);
      variables++;
      if(variables == this.parameterservice.totalStorageVariables) {
        observer.complete();
      }
    })

    this.storage.get('hcpmBaseURL').then((data) => {
      this.parameterservice.baseUrl = data;
      observer.next(data);
      variables++;
      if(variables == this.parameterservice.totalStorageVariables) {
        observer.complete();
      }
    })


   
  })
  setURL(url) {
    this.storage.set('hcpmBaseURL', url);
    this.parameterservice.baseUrl = url;
  }

  setLoginCrendentials(loginCred) {
    this.storage.set('hcpmLoginCredentials', loginCred);
    this.parameterservice.loginCredentials = loginCred;
  }

  setERPConfig(erpConfig) {
    this.storage.set('hcpmErpConfig', erpConfig);
    this.parameterservice.erpConfig = erpConfig;
  }

  setIsManager(isManager: boolean) {
    this.storage.set('hcpmIsManager', isManager);
    this.parameterservice.isManager = isManager;
  }

  setAuthenticated(authenticated: boolean) {
    this.storage.set('hcpmAuthenticated', authenticated);
    this.parameterservice.authenticated = authenticated;
  }

  setEmail(user: string) {
    this.storage.set('hcpmEmail', user);
    this.parameterservice.email = user;
  }

  setToken(token: string) {
    this.storage.set('hcpmToken', token);
    this.parameterservice.token = token;
  }

  setTokenExpiryDateTime(tokenExpiryDateTime: Date) {
    this.storage.set('hcpmTokenExpiryDateTime', tokenExpiryDateTime);
    this.parameterservice.tokenExpiryDateTime = tokenExpiryDateTime;
  }

  setUserDetails(user: any) {
    this.storage.set('employee', user);
    this.parameterservice.emp = user;
  }

  clearStorage(){
    this.storage.clear();
    if(this.parameterservice.loginCredentials){
      this.setLoginCrendentials(this.parameterservice.loginCredentials);
      this.setURL(this.parameterservice.baseUrl);
    }
  }
}
