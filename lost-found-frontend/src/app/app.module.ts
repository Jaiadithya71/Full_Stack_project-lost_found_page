import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LostItemsModule } from './lost-items/lost-items.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NativeDateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY', // Format for parsing input dates
  },
  display: {
    dateInput: 'DD-MM-YYYY', // Format for displaying dates in input
    monthYearLabel: 'MMM YYYY', 
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LostItemsModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter }, // Use the NativeDateAdapter
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // en-GB locale for dd-MM-yyyy format
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
