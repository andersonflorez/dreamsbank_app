import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTransactionPageRoutingModule } from './create-transaction-routing.module';

import { CreateTransactionPage } from './create-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTransactionPageRoutingModule
  ],
  declarations: [CreateTransactionPage]
})
export class CreateTransactionPageModule {}
