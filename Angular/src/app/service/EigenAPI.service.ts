import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as moment from "moment";
import "rxjs/add/operator/map";

@Injectable()
export class EigenAPIService {
    constructor(private _http: HttpClient) { }

    GetList() : Observable<ISong[]>
    {
        return this._http.get<ISong[]>("http://localhost:5000/api/v1/songs");
    }

}

export interface Artist {
    id: number;
    name: string;
}

export interface ISong {
    id: number;
    title: string;
    genre: string;
    artist: Artist;
}