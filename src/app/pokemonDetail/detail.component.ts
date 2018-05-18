import { Component, OnInit } from '@angular/core';
import * as PokeAPI from '../service/PokeAPI.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ActivatedRoute } from '@angular/router';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  constructor(private _svc : PokeAPI.PokeAPIService, private route: ActivatedRoute) {
  }

  ServiceOutput : PokeAPI.IPokemon

  limit = 20;
  offset = 0;
  count = 0;
  placeholder = "";

  id: number;
  private sub: any;

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });

    let url = "https://pokeapi.co/api/v2/pokemon/" + this.id + "/";

    this._svc.GetPokemon(url)
            .subscribe(result => {
            this.ServiceOutput = result;
            console.log(result.name);
            });
    
  }

  getPokemon()
  {
    //return this.ServiceOutput.results[0].name;
    //return "test";
  }


}


