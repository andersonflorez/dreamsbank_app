import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  Plugins,
  StatusBarStyle,
} from "@capacitor/core";
import { AuthenticationService } from "./services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;

    try {
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: StatusBarStyle.Dark });

      if (this.platform.is("android")) {
        StatusBar.setBackgroundColor({ color: "#181818" });
      }
    } catch (err) {
      console.log("This is normal is a browser", err);
    }

    this.authenticationService.authState.subscribe(state => {
      if (state) {
        this.router.navigate(["home"]);
      } else {
        this.router.navigate(["login"]);
      }
    });
  }
}
