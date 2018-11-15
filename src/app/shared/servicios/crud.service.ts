import { Injectable } from '@angular/core';
import 'rxjs/add/operator/delay';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import {AuthGuard} from './auth/auth.guard';

@Injectable()
export class CrudService {
  readonly puerto = "http://localhost:8000/";
  private header: Headers;

  constructor(private http: Http, private httpClient: HttpClient ) {
    // this.header = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    // if(localStorage.getItem('authToken'))
    //   this.header.append('Authorization', `${ localStorage.getItem('tokenType') } ${ localStorage.getItem('authToken') }`);
  }

  Seleccionar(api, param?) {
    //var headerOptions = new Headers({ 'Authorization': `${ this.authGuard.tokenType } ${ this.authGuard.authToken }` ,  'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    return this.http.get(this.puerto + api, { params: param, headers: this.getHeaders() });
  }

  Ejecutar(api, param?) {
    return this.http.get(this.puerto + api, { params: param, headers: this.getHeaders() });
  }

  SeleccionarAsync(api, param?) {
    var headerOptions = new HttpHeaders( this.getHeaders().toJSON() )
    return this.httpClient.get(this.puerto + api, { params: param, headers: headerOptions }).toPromise();
  }

  login(api, objeto) {
    var body = objeto;
    //var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({  method: RequestMethod.Post, headers: this.getHeaders() });
    return this.http.post(this.puerto + api, body, requestOptions).map(res => res.json());
  }

  SetBool(datos) {
    let index = 0;
    for (let i of datos) {

      if (i.Estado == 'ACT') {
        datos[index].Estado = true;
      }
      else {
        datos[index].Estado = false;
      }
      index++;
    }
    console.log(datos);
    return datos;
  }

  _listParams(api, params?) {
    return this.httpClient.post(this.puerto + api + '/list', params).toPromise();
  }

  Actualizar(id, objeto, api) {
    var body = objeto;
    //var headerOptions = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: this.getHeaders(),  });
    return this.http.put(this.puerto + api + id, body, requestOptions).map(res => res.json());
  }

  Insertar(objeto, api) {
    var body = objeto;
    //var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.getHeaders() });
    return this.http.post(this.puerto + api, body, requestOptions).map(res => res.json());
  }

  Eliminar(ID, api) {
    //var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Delete, headers: this.getHeaders() });
    return this.http.delete(this.puerto + api + ID, requestOptions).map(res => res.json());
  }

  getHeaders(){
    let header = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    if(localStorage.getItem('authToken'))
      header.append('Authorization', `${ localStorage.getItem('tokenType') } ${ localStorage.getItem('authToken') }`);
    return header;
  }
}
