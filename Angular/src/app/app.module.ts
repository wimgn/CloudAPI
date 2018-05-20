import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './pokemonDetail/detail.component';
import { TypeComponent } from './type/type.component';
import { SongsComponent } from './songs/songs.component'

import { PokeAPIService } from './service/PokeAPI.service';
import { EigenAPIService } from './service/EigenAPI.service';

import { FormsModule } from '@angular/forms';

import { RouterModule } from "@angular/router";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    PageNotFoundComponent,
    DetailComponent,
    TypeComponent,
    SongsComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent},
      { path: 'pokemon/:id', component: DetailComponent},
      { path: 'type/:id', component: TypeComponent},
      { path: 'songs', component: SongsComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: "**", component: PageNotFoundComponent}
    ], { useHash: true }),
    HttpClientModule,
    FormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    HttpClient,
    PokeAPIService,
    EigenAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
