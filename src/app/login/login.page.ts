import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(
    private authService: AuthenticationService,
    public toastController: ToastController
  ) {}
  ngOnInit() {}

  login = async (form: any) => {
    await this.authService.login(form.value);
  };
}
