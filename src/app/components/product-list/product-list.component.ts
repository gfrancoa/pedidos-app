import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  //pendientes

  //CONTROLAR SI USUARIO SE DEVUELVE (DESAPARECER DROPDOWNS)
  //CONTROLAR SI EL USUARIO CAMBIA DE PRODUCTO VS EL PRECIO UNITARIO
  public indexSelected = -1;
  public configObj: any;
  public tipo_masa: String = '';
  public selected_masa_id = -1;
  public tipo_pan: String = '';
  public selected_pan_id = -1;
  public data_tamano: any[] = [];
  public longitud_gramos: String = '';
  public precio_tipo_masa: Number = 0;
  public precio_tamano: Number = 0;
  public precio_topping: Number = 0;
  public data_topping: any[] = [];
  public topping: String = '';
  public foto: String = '';
  public cantidad: Number = 0;
  public formIsVisible: Boolean = false;
  public confirmation: Boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public config: ConfigService,
    public storage: StorageService
  ) {
    // console.log('config', this.config.getConfig().opciones_producto);
    this.configObj = this.config.getConfig().opciones_producto;
  }

  ngOnInit(): void {}

  selectTipoMasa(index: any) {
    this.cantidad = 0;
    this.indexSelected = index;
    this.tipo_masa = this.configObj.masa[index].tipo;
    this.selected_masa_id = this.configObj.masa[index].id;
    this.precio_tipo_masa = this.configObj.masa[index].precio_base;
    console.log('selected masa id', this.selected_masa_id);
  }

  mostrarForm() {
    this.formIsVisible = true;
  }

  selectTipoPan(index: any) {
    if (index != undefined) {
      // console.log(index);
      this.tipo_pan = this.configObj.tipo_pan[index].tipo;
      this.selected_pan_id = this.configObj.tipo_pan[index].id;
      this.data_tamano = this.configObj.tipo_pan[index].data;
      console.log('selected pan id', this.selected_pan_id);
    }
  }

  selectTamano(index: any) {
    if (index != undefined) {
      this.longitud_gramos = this.data_tamano[index].dim;
      this.precio_tamano = this.data_tamano[index].precio_base;
      //hamburguesa brioche manteq
      if (this.selected_masa_id == 1 && this.selected_pan_id == 1) {
        this.data_topping = this.configObj.topping.hamb_brioche;
        //perro blanco
      } else if (this.selected_masa_id == 2 && this.selected_pan_id == 2) {
        this.data_topping = this.configObj.topping.perro_blanco;
        //hamb blanco
      } else if (this.selected_masa_id == 2 && this.selected_pan_id == 1) {
        this.data_topping = this.configObj.topping.hamb_blanco;
        //perro brioche
      } else if (this.selected_masa_id == 1 && this.selected_pan_id == 2) {
        this.data_topping = this.configObj.topping.perro_brioche;
        //sandwich blanco
      } else if (this.selected_masa_id == 2 && this.selected_pan_id == 3) {
        this.data_topping = this.configObj.topping.sand_blanco;
        //sand brioche
      } else if (this.selected_masa_id == 1 && this.selected_pan_id == 3) {
        this.data_topping = this.configObj.topping.sand_brioche;
      }
    }
  }

  selectTopping(index: any) {
    this.topping = this.data_topping[index].top;
    this.precio_topping = this.data_topping[index].precio_base;
    this.foto = this.data_topping[index].foto;
  }

  selectCantidad(cantidad: any) {
    this.cantidad = Number(cantidad);
    console.log('cantidad', Number(cantidad));
  }

  agregarItem() {
    const item = {
      tipo_pan: this.tipo_pan,
      tipo_masa: this.tipo_masa,
      longitud_gramos: this.longitud_gramos,
      topping: this.topping,
      cantidad: this.cantidad,
      precio_unitario:
        Number(this.precio_tamano) +
        Number(this.precio_tipo_masa) +
        Number(this.precio_topping),
      subtotal:
        (Number(this.precio_tamano) +
          Number(this.precio_tipo_masa) +
          Number(this.precio_topping)) *
        Number(this.cantidad),
      foto: this.foto,
    };

    this.storage.items = [...this.storage.items, item];
    this.confirmation = true;
    setTimeout(() => {
      this.confirmation = false;
      this.cleanForm();
    }, 500);
  }

  calcularTotal() {
    return [
      Number(this.precio_tamano) +
        Number(this.precio_tipo_masa) +
        Number(this.precio_topping),

      (Number(this.precio_tamano) +
        Number(this.precio_tipo_masa) +
        Number(this.precio_topping)) *
        Number(this.cantidad),
    ];
  }

  cleanForm() {
    this.indexSelected = -1;
    this.tipo_masa = '';
    this.selected_masa_id = -1;
    this.tipo_pan = '';
    this.selected_pan_id = -1;
    this.data_tamano = [];
    this.longitud_gramos = '';
    this.precio_tipo_masa = 0;
    this.precio_tamano = 0;
    this.precio_topping = 0;
    this.data_topping = [];
    this.topping = '';
    this.foto = '';
    this.cantidad = 0;
    this.formIsVisible = false;
  }
}
