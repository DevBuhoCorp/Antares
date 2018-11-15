import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  getEmpresaActive(){
    return JSON.parse( localStorage.getItem('Empresa') );
  }

  getPaginas(){
    return [ 5, 10, 20];
  }



}
