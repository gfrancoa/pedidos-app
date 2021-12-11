import { Component, OnInit } from '@angular/core';
import {
  faArrowLeft,
  faTrash,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  public arrowLeft = faArrowLeft;
  public trash = faTrash;
  public plus = faPlus;
  public minus = faMinus;
  public total: Number = 0;
  public isFormVisible: Boolean = true;
  public isFormEmptyVisible: Boolean = false;
  public isButtonVisible: Boolean = true;
  public isFormCompleteVisible: Boolean = false;
  public fecha_entrega: String = '';
  public observaciones: String = '';
  //datos usuario
  public nombre_persona: String = '';
  public nombre_negocio: String = '';
  public tipo_id: String = ''; // CC, NIT sin digito de verif
  public id_usuario: String = '';
  public celular: String = '';
  public _id_db: String = ''; //id del usuario en BD. Para crear el pedido

  constructor(public storage: StorageService) {}

  ngOnInit(): void {}

  borrarItem(index: any) {
    this.storage.items.splice(index, 1);
  }

  lessAmount(index: any) {
    if (this.storage.items[index].cantidad > 0) {
      this.storage.items[index].cantidad =
        this.storage.items[index].cantidad - 1;
      this.storage.items[index].subtotal =
        this.storage.items[index].cantidad *
        this.storage.items[index].precio_unitario;
    }
  }

  moreAmount(index: any) {
    this.storage.items[index].cantidad = this.storage.items[index].cantidad + 1;
    this.storage.items[index].subtotal =
      this.storage.items[index].cantidad *
      this.storage.items[index].precio_unitario;
  }

  calcularTotal() {
    this.total = 0;
    for (let i = 0; i < this.storage.items.length; i++) {
      this.total = this.total + this.storage.items[i].subtotal;
    }
    return this.total;
  }

  setId(value: any) {
    this.id_usuario = value;
  }

  setNombrePersona(value: any) {
    this.nombre_persona = value;
  }

  setNombreNegocio(value: any) {
    this.nombre_negocio = value;
  }

  setCelular(value: any) {
    this.celular = value;
  }

  setTipoId(value: any) {
    this.tipo_id = value;
  }

  findUser() {
    //hacer el service
    //y consultar si el usuario ya existe y traerlo

    //si no existe traer los campos para llenar:
    this.isFormEmptyVisible = true;
    this.isButtonVisible = false;
  }

  setDate(date: any) {
    this.fecha_entrega = date;
  }

  enviarPedido() {
    //si no existe el usuario crearlo,
    //si existe asociar crear el pedido con el _id
    //enviar el pedido a whatsapp
  }
}
