import { Component, OnInit } from '@angular/core';
import * as PokeAPI from '../service/PokeAPI.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _svc : PokeAPI.PokeAPIService) {
  }

  ServiceOutput : PokeAPI.IPokeAPI;
  Pokemons : PokeAPI.IPokemon[] = [];

  limit = 20;
  offset = 0;
  count = 0;
  placeholder = "";

  ngOnInit() {
    this._svc.GetList(this.limit, this.offset)
            .subscribe(result => {
            this.ServiceOutput = result;
            this.count = 0;
            for (let p of this.ServiceOutput.results)
            {
              console.log(p.url); 
              this._svc.GetPokemon(p.url)
                    .subscribe(result => {
                      this.Pokemons.push(result);
                      this.count++;
                      console.log(this.count);
                      if (this.count == this.limit) 
                      {
                        console.log("ok");
                        this.Pokemons = this.Pokemons.sort((p1,p2) : number => {
                          if (p1.id < p2.id) return -1;
                          if (p1.id > p2.id) return 1;
                          return 0;
                        }); 
                      }
                    });  
            };
                     
            });
    
  }

  getPokemon()
  {
    return this.ServiceOutput.results[0].name;
    //return "test";
  }

  Next(event)
  {
    if (this.ServiceOutput.next != null)
    {
      this.Pokemons = [];
      let url = this.ServiceOutput.next;
      this.ServiceOutput = null;
      this._svc.ChangePage(url)
              .subscribe(result => {
                this.ServiceOutput = result;
                this.count = 0;
                for (let p of this.ServiceOutput.results)
                {
                  console.log(p.url); 
                  this._svc.GetPokemon(p.url)
                        .subscribe(result => {
                          this.Pokemons.push(result);
                          this.count++;
                          console.log(this.count);
                          if (this.count == this.limit) 
                          {
                            this.Pokemons = this.Pokemons.sort((p1,p2) : number => {
                              if (p1.id < p2.id) return -1;
                              if (p1.id > p2.id) return 1;
                              return 0;
                            }); 
                          }
                        });  
                };
                this.count = 0;
              });
    }
  }
  Previous(event)
  {
    if (this.ServiceOutput.previous != null)
    {
      this.Pokemons = [];
      let url = this.ServiceOutput.previous;
      this.ServiceOutput = null;
      this._svc.ChangePage(url)
              .subscribe(result => {
                this.ServiceOutput = result;
                this.count = 0;
                for (let p of this.ServiceOutput.results)
                {
                  console.log(p.url); 
                  this._svc.GetPokemon(p.url)
                        .subscribe(result => {
                          this.Pokemons.push(result);
                          this.count++;
                          console.log(this.count);
                          if (this.count == this.limit) 
                          {
                            this.Pokemons = this.Pokemons.sort((p1,p2) : number => {
                              if (p1.id < p2.id) return -1;
                              if (p1.id > p2.id) return 1;
                              return 0;
                            }); 
                          }
                        });  
                };
                this.count = 0;
              });
    }
  }

}


