import { Component, OnInit } from '@angular/core';
import * as PokeAPI from '../service/PokeAPI.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ActivatedRoute, Router } from '@angular/router';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
  constructor(private _svc : PokeAPI.PokeAPIService, private route: ActivatedRoute, private router : Router) {
  }

  ServiceOutput : PokeAPI.IType

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

  Type(event, url)
  {
    this._svc.GetType(url)
            .subscribe(result => {
            console.log(result.id);
            this.router.navigate(['/type', result.id]);
            });
  }


}


