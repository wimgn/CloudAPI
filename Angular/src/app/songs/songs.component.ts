import { Component, OnInit } from '@angular/core';
import { EigenAPIService, ISong } from '../service/EigenAPI.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ActivatedRoute, Router } from '@angular/router';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  constructor(private _svc : EigenAPIService, private route: ActivatedRoute, private router: Router) {
  }

  ServiceOutput : ISong[]

  id: number;
  private sub: any;

  ngOnInit() {

    this._svc.GetList()
              .subscribe(result => {
              this.ServiceOutput = result;
              console.log(result[0].title);
              });
    
  }

  /*Type(event, url)
  {
    this._svc.GetType(url)
            .subscribe(result => {
            console.log(result.id);
            this.router.navigate(['/type', result.id]);
            });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }*/


}


