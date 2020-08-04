import { Component, OnInit } from "@angular/core";
import { RequestsService } from "../services/requests.service";
import { ModalController } from "@ionic/angular";
import { NavParams } from "@ionic/angular";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-create-transaction",
  templateUrl: "./create-transaction.page.html",
  styleUrls: ["./create-transaction.page.scss"],
})
export class CreateTransactionPage implements OnInit {
  public product: any;

  constructor(
    public request: RequestsService,
    public modalController: ModalController,
    navParams: NavParams,
    public toastController: ToastController
  ) {
    this.product = navParams.data;
  }

  ngOnInit() {}

  createTransaction = (form: any) => {
    this.request
      .requestWithToken("transactions", "POST", {
        ...form.value,
        product_id: this.product.id,
      })
      .then(async (response: any) => {
        const toast = await this.toastController.create({
          message: response.message,
          duration: 2000,
        });
        toast.present();
        this.modalController.dismiss();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  dismissModal = () => {
    this.modalController.dismiss();
  }

}
