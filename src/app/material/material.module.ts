import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import { MatMenuModule } from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatTabsModule} from '@angular/material/tabs';  
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table'; 
import {MatChipsModule} from '@angular/material/chips'; 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatCardModule,MatProgressSpinnerModule,MatProgressBarModule,
    MatIconModule,MatToolbarModule,MatMenuModule,MatListModule,MatTabsModule,MatCheckboxModule,MatSelectModule
    ,MatTableModule,MatSnackBarModule,MatChipsModule
  ],
  exports: [

    CommonModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatCardModule,MatProgressSpinnerModule,MatProgressBarModule,
    MatIconModule,MatToolbarModule,MatMenuModule,MatListModule,MatTabsModule,MatCheckboxModule,MatSelectModule
    ,MatTableModule,MatSnackBarModule,MatChipsModule
  ]
})
export class MaterialModule { }