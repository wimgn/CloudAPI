import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './pokemonDetail/detail.component';

import { IssMapComponent } from './iss-map/iss-map.component';
import { AgmCoreModule } from '@agm/core';
import { SpaceStationService } from './service/space-station.service';
import { PokeAPIService } from './service/PokeAPI.service';

import { FormsModule } from '@angular/forms';

import { RouterModule } from "@angular/router";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IssMapComponent,
    NavBarComponent,
    PageNotFoundComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent},
      { path: 'pokemon/:id', component: DetailComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: "**", component: PageNotFoundComponent}
    ], { useHash: true }),
    HttpClientModule,
    FormsModule,
    // Deze key is nodig voor de kaart !
    AgmCoreModule.forRoot({ 
      apiKey: 'AIzaSyAg3VsKAoL3f5I4T052D7jNr7NxzyDCXQo'
    })
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    HttpClient,
    SpaceStationService,
    PokeAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
