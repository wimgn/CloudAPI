import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as moment from "moment";
import "rxjs/add/operator/map";

@Injectable()
export class PokeAPIService {
    constructor(private _http: HttpClient) { }

    GetList(limit=20,offset=0) : Observable<IPokeAPI>
    {
        return this._http.get<IPokeAPI>("https://pokeapi.co/api/v2/pokemon/?limit="+limit+"&offset="+offset);
    }
    ChangePage(url: string)
    {
        return this._http.get<IPokeAPI>(url);
    }
    GetPokemon(url : string)
    {
        return this._http.get<IPokemon>(url);
    }


}

export interface Result {
    url: string;
    name: string;
}

export interface IPokeAPI {
    count: number;
    previous: string;
    results: Result[];
    next: string;
}

export interface Ability2 {
    name: string;
    url: string;
}

export interface Ability {
    is_hidden: boolean;
    slot: number;
    ability: Ability2;
}

export interface Form {
    name: string;
    url: string;
}

export interface Version {
    name: string;
    url: string;
}

export interface GameIndice {
    game_index: number;
    version: Version;
}

export interface Move2 {
    name: string;
    url: string;
}

export interface VersionGroup {
    name: string;
    url: string;
}

export interface MoveLearnMethod {
    name: string;
    url: string;
}

export interface VersionGroupDetail {
    level_learned_at: number;
    version_group: VersionGroup;
    move_learn_method: MoveLearnMethod;
}

export interface Move {
    move: Move2;
    version_group_details: VersionGroupDetail[];
}

export interface Species {
    name: string;
    url: string;
}

export interface Stat2 {
    name: string;
    url: string;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: Stat2;
}

export interface Type2 {
    name: string;
    url: string;
}

export interface Type {
    slot: number;
    type: Type2;
}

export interface IPokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Ability[];
    forms: Form[];
    game_indices: GameIndice[];
    held_items: any[];
    location_area_encounters: any[];
    moves: Move[];
    species: Species;
    stats: Stat[];
    types: Type[];
}
