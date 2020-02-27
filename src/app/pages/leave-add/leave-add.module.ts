import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveAddPage } from './leave-add.page';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

const routes: Routes = [
  {
    path: '',
    component: LeaveAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    IonicModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeaveAddPage]
})
export class LeaveAddPageModule {}
