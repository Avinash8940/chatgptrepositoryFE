import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  private _url:string = 'http://localhost:4200/ask';

  constructor(private _httpClient:HttpClient) { }
  getMessage(message:String):Observable<String> {   
    return this._httpClient.get(`${this._url}/${message}`,{responseType:'text'});
  }
}