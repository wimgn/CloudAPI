import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import "rxjs/add/observable/of";
import { DatePipe } from '@angular/common';

@Injectable()
export class SpaceStationService {

  //De historiek van posities kan je hier 'cachen'
  history: ICoord[] = [];

  constructor(private _http: HttpClient) { }

  // Haal de huidige positie van het ISS op
  GetPosition() : Observable<IPosition>
  {
      return this._http.get<IPosition>("https://quotes.rest/qod/sports");
  }

  // Haal de bewaarde posities (historiek) van het ISS op
  getHistory() {
    return this.history;
  }

  //Sla een positie bij op in de historiek
  AddHistory(coord: ICoord) {
    this.history.push(coord);
  }
}

//gebruik deze interface om:
//mee te binden in je component
//mee te sturen/ontvangen van je eigen REST API service
export interface ICoord {
  lat: number;
  long: number;
  date: Date;
}

export interface IPosition {
  message: string;
  timestamp: number;
  iss_position: Issposition;
}

export interface Issposition {
  latitude: string;
  longitude: string;
}