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
import { TimesheetLinePage } from './timesheet-line.page';

import { CommentPageForLine } from './comment/comment.page';
const routes: Routes = [
  {
    path: '',
    component: TimesheetLinePage
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
  entryComponents:[CommentPageForLine],
  declarations: [TimesheetLinePage,CommentPageForLine]
})
export class TimesheetLinePageModule {}
