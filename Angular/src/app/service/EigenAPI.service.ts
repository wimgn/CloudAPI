import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as moment from "moment";
import "rxjs/add/operator/map";

@Injectable()
export class EigenAPIService {
    constructor(private _http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

    GetList() : Observable<ISong[]>
    {
        return this._http.get<ISong[]>("http://localhost:5000/api/v1/songs");
    }
    GetSongsGenre(genre) : Observable<ISong[]>
    {
        return this._http.get<ISong[]>("http://localhost:5000/api/v1/songs?genre="+genre);
    }
    PostSong(song) {
        return this._http.post<Song>("http://localhost:5000/api/v1/songs",song,this.httpOptions);
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

export interface Song {
    title: string;
    genre: string;
}