import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  //las variables que quiero utilizar para referenciar en todos lados las creo aquí
  public items: any[] = [];

  constructor() {}
}
