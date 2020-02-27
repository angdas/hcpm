import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material';

import { DocumentRequestAddPage } from './document-request-add.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentRequestAddPage
  }
];

@NgModule({
  imports: [
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DocumentRequestAddPage]
})
export class DocumentRequestAddPageModule {}
