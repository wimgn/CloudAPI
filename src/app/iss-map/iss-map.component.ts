import { Component, OnInit } from '@angular/core';
import { ICoord, IPosition, Issposition, SpaceStationService } from '../service/space-station.service';

@Component({
  selector: 'app-iss-map',
  templateUrl: './iss-map.component.html',
  styleUrls: ['./iss-map.component.scss']
})
export class IssMapComponent implements OnInit {

  //Gebruik deze property om de huidige positie van het ISS in op te slaan en weer te geven
  StartLat : Number = 51.2603015;
  StartLong : Number = 4.217639;

  Lat : Number = 0;
  Long : Number = 0;

  current : IPosition;
  loc : IPosition;
  datum : Number;
  
  constructor(private _svc : SpaceStationService) { }

  ngOnInit() {
    this._svc.GetPosition()
            .subscribe(result => {
              this.StartLong = +result.iss_position.longitude;
               this.StartLat = +result.iss_position.latitude;
               this.Long = +result.iss_position.longitude;
               this.Lat = +result.iss_position.latitude;
              });
    
    setInterval(this.SetLocation , 3000);
  }

  SetLocation() {
    this._svc.GetPosition()
            .subscribe(result => {
               this.Long = +result.iss_position.longitude;
               this.Lat = +result.iss_position.latitude;
               this.datum = result.timestamp;
              });
  }

  private convertStringToNumber(value: string): number {
    return +value;
  }
}
