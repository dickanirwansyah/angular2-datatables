import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Menu } from './menu';

@Injectable()
export class MenuService{

    //---- API RESTFULL JAVA ---//
    _URImenus = "http://localhost:8080/api/data/list/menus";
    _URIsave = "http://localhost:8080/api/data/insert/menus";
    _URIupdate = "http://localhost:8080/api/data/update/menus";
    _URIdelete = "http://localhost:8080/api/data/delete/menus/";
    _URIgetid = "http://localhost:8080/api/data/get/menus/"
    _URIlogin = "http://localhost:8080/authentication/login";
    constructor(private _http:Http){}

    //JSON DATA
    private getJsonData(res: Response){
      let body = res.json();
      return body;
    }

    //ERROR HANDLING
    private getHandlingError(error: Response | any){
      console.error(error.message || error);
      return Observable.throw(error.status);
    }

    //GET SERVICE MENU
    getServiceListMenu():Observable<Menu[]>{
      return this._http.get(this._URImenus)
      .map(this.getJsonData);
    }

    //POST SERVICE MENU
    getSaveMenu(menu: Menu):Observable<number>{
      let cpHeaders = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers : cpHeaders});
      return this._http.post(this._URIsave, menu, options)
      .map(success => success.status).catch(this.getHandlingError);
    }

    //PUT SERVICE MENU
    getUpdateMenu(menu: Menu):Observable<number>{
      let cpHeaders = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers : cpHeaders});
      return this._http.put(this._URIupdate, menu, options)
      .map(success => success.status).catch(this.getHandlingError);
    }

    //DELETE SERVICE MENU
    getDeleteMenu(idmenus: string):Observable<number>{
      let cpHeaders = new Headers({'Content-Type': 'application/json'});
      let cpParams = new URLSearchParams();
      cpParams.set('idmenus', idmenus);
      let options = new RequestOptions({headers: cpHeaders, params: cpParams});
      return this._http.delete(this._URIdelete + idmenus, options)
      .map(success => success.status).catch(this.getHandlingError);
    }

    //GET SERVICE MENU ID
    getById(idmenus: string):Observable<Menu>{
      let cpHeaders = new Headers({'Content-Type': 'application/json'});
      let cpParams = new URLSearchParams();
      cpParams.set('idmenus', idmenus);
      let options = new RequestOptions({headers: cpHeaders, params: cpParams});
        return this._http.get(this._URIgetid + idmenus, options)
        .map(this.getJsonData).catch(this.getHandlingError);
    }
}
