import { Component } from "@angular/core";
import { RequestsService } from "../services/requests.service";
import { ToastController } from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import { CreateTransactionPage } from "../create-transaction/create-transaction.page";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  public products: Array<any> = [];

  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    public request: RequestsService,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.request
      .requestWithToken("getProductsApproved", "GET")
      .then((response: any) => {
        this.products = response.products;
      })
      .catch(async (error) => {
        const toast = await this.toastController.create({
          message: "Ha ocurrido un error",
          duration: 2000,
        });
        toast.present();
      });
  }

  createTransaction = async (product: any) => {
    const modal = await this.modalController.create({
      component: CreateTransactionPage,
      componentProps: product
    });
    return await modal.present();
  };

  logout(){
    this.authenticationService.logout();
  }
}
