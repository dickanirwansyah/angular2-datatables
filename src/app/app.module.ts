import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';
import { DataTableModule } from 'angular2-datatable';
import { MenuService } from './menu/menu.service';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    DataTablesModule,
    DataTableModule
  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
