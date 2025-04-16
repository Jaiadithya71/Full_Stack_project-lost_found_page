import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundItemsListComponent } from './found-items-list/found-items-list.component';
import { FoundItemFormComponent } from './found-item-form/found-item-form.component';
import { FoundItemDetailsComponent } from './found-item-details/found-item-details.component';
import { EditFoundItemComponent } from './edit-found-item/edit-found-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { FoundItemsRoutingModule } from './found-items-routing.module';

@NgModule({
  declarations: [
    FoundItemsListComponent,
    FoundItemFormComponent,
    FoundItemDetailsComponent,
    EditFoundItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FoundItemsRoutingModule
  ]
})
export class FoundItemsModule {}