import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { RequestsService } from './requests.service';

@Injectable()
export class AuthenticationService {


  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    public toastController: ToastController,
    public request: RequestsService,
  ) {
    
      this.ifLoggedIn();
    
  }

  ifLoggedIn() {
    this.storage.get('userToken').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }


  async login(credentials){
    this.request.requestWithoutToken("login", "POST", credentials).then((response: any) => {
      this.storage.set('userToken', response.access_token).then(() => {
        this.router.navigate(['']);
        this.authState.next(true);
      });
    }).catch(async (error) => {
      console.log(error.error.message)
      const toast = await this.toastController.create({
        message: error.error,
        duration: 2000
      });
      toast.present();
    })
  }

  logout() {
    this.storage.remove('userToken').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

}
