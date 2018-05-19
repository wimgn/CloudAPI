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
    GetType(url : string)
    {
        return this._http.get<IType>(url);
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

export interface NoDamageTo {
    name: string;
    url: string;
}

export interface HalfDamageTo {
    name: string;
    url: string;
}

export interface DoubleDamageTo {
    name: string;
    url: string;
}

export interface NoDamageFrom {
    name: string;
    url: string;
}

export interface HalfDamageFrom {
    name: string;
    url: string;
}

export interface DoubleDamageFrom {
    name: string;
    url: string;
}

export interface DamageRelations {
    no_damage_to: NoDamageTo[];
    half_damage_to: HalfDamageTo[];
    double_damage_to: DoubleDamageTo[];
    no_damage_from: NoDamageFrom[];
    half_damage_from: HalfDamageFrom[];
    double_damage_from: DoubleDamageFrom[];
}

export interface Generation {
    name: string;
    url: string;
}

export interface GameIndice {
    game_index: number;
    generation: Generation;
}

export interface Generation2 {
    name: string;
    url: string;
}

export interface MoveDamageClass {
    name: string;
    url: string;
}

export interface IType {
    id: number;
    name: string;
    damage_relations: DamageRelations;
    game_indices: GameIndice[];
    generation: Generation2;
    move_damage_class: MoveDamageClass;
}