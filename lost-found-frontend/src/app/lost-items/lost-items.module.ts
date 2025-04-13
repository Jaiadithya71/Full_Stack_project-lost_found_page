import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LostItemFormComponent } from './lost-item-form/lost-item-form.component';
import { LostItemsListComponent } from './lost-items-list/lost-items-list.component';
import { LostItemDetailsComponent } from './lost-item-details/lost-item-details.component';
import { EditLostItemComponent } from './edit-lost-item/edit-lost-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LostItemsRoutingModule } from './lost-items-routing.module';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    LostItemFormComponent,
    LostItemsListComponent,
    LostItemDetailsComponent,
    EditLostItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule, 
    MatSelectModule,
    FormsModule,
    LostItemsRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ]
})
export class LostItemsModule {}