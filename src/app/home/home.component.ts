import { Component, OnInit } from '@angular/core';
import { QodService, IQod } from '../service/qod.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _svc : QodService) {
  }

  ServiceOutput : IQod;

  ngOnInit() {
    this._svc.GetMusea()
            .subscribe(result => this.ServiceOutput = result);
  }

  getImage ()
  {
    return this.ServiceOutput.contents.quotes[0].background
    //return `https://upload.wikimedia.org/wikipedia/commons/c/c4/PM5544_with_non-PAL_signals.png`;
  }

  getTitle() {
    return this.ServiceOutput.contents.quotes[0].title;
    //return "Testing";
  }

  getQuote() {
    return this.ServiceOutput.contents.quotes[0].quote;
    //return "Testing";
  }
}


