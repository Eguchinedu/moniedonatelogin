import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import {MatButtonModule} from '@angular/material/button';  

import { OverlayModule } from '@angular/cdk/overlay';



@NgModule({
  exports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSortModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    OverlayModule,
    DialogModule
  ],
})
export class MaterialModule {}
