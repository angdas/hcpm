import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LeaveHomePage } from './leave-home.page';
import { LeaveHomeElementPage } from './leave-home-element/leave-home-element.page';

const routes: Routes = [
  {
    path: '',
    component: LeaveHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeaveHomePage,LeaveHomeElementPage]
})
export class LeaveHomePageModule {}
