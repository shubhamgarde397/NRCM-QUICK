import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routes } from './app.route';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { getFullApi } from './common/services/ApiCalls/getFullApi.service';
import { handleFunction } from './common/services/functions/handleFunctions';
import { DrawerComponent } from './drawer/drawer.component';
import { HandleDataService } from './common/services/Data/handle-data.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ExcelService } from './common/services/sharedServices/excel.service';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatSelectModule, 
  MatIconModule,
  MatSidenavModule
} from '@angular/material';
import { LoginComponent } from './pages/login/login/login.component';
import { NavigationComponent } from './pages/Navigation/navigation/navigation.component';
import { TruckDataComponent } from './pages/Navigation/TruckData/truck-data/truck-data.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    DrawerComponent,
    PageNotFoundComponent,
    MainPageComponent,
    LoginComponent,
    NavigationComponent,
    TruckDataComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    Ng4LoadingSpinnerModule.forRoot()

  ],
  providers: [getFullApi, handleFunction, HandleDataService, ExcelService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
