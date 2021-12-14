import { Component, OnInit } from '@angular/core';
import {
  faArrowLeft,
  faTrash,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { PedidoService } from '../services/pedido.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

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
  public observaciones: String = 'Ninguna';
  //datos usuario
  public nombre_persona: String = '';
  public nombre_negocio: String = '';
  public tipo_id: String = ''; // CC, NIT sin digito de verif
  public id_usuario: String = '';
  public celular: String = '';
  public _id_db: String = ''; //id del usuario en BD. Para crear el pedido

  constructor(
    public storage: StorageService,
    public userService: UserService,
    public pedidoService: PedidoService
  ) {}

  ngOnInit(): void {}

  limpiarData() {
    this.total = 0;
    this.isFormVisible = true;
    this.isFormEmptyVisible = false;
    this.isButtonVisible = true;
    this.isFormCompleteVisible = false;
    this.fecha_entrega = '';
    this.observaciones = 'Ninguna';
    this.nombre_persona = '';
    this.nombre_negocio = '';
    this.tipo_id = ''; // CC, NIT sin digito de verif
    this.id_usuario = '';
    this.celular = '';
    this._id_db = ''; //id del usuario en BD. Para crear el pedido
    this.storage.items = [];
  }

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

  setObservaciones(value: any) {
    this.observaciones = value;
  }

  findUser() {
    this.userService.listById(this.id_usuario).subscribe({
      next: (res: any) => {
        if (res.status == 404) {
          console.log('Usuario no existe', res);
          //si no existe traer los campos para llenar:
          this.isFormEmptyVisible = true;
          this.isButtonVisible = false;
        } else {
          this.nombre_persona = res.nombre_persona;
          this.nombre_negocio = res.nombre_negocio;
          this.tipo_id = res.tipo_id; // CC, NIT sin digito de verif
          this.id_usuario = res.id_usuario;
          this.celular = res.celular;
          this._id_db = res._id;
          this.isFormCompleteVisible = true;
          this.isButtonVisible = false;
          this.isFormVisible = false;
          this._id_db = res._id;
        }
      },
      complete: () => {
        //do something
      }, // completeHandler
      error: (err) => {
        console.log('Error recuperando usuario por id', err);
      }, // errorHandler
    });
  }

  setDate(date: any) {
    this.fecha_entrega = date;
  }

  enviarPedido() {
    const mensaje = `Buen día. Mi pedido es el siguiente:
    ${this.storage.items.map((item) => {
      return `
        ${item.cantidad}x ${item.tipo_pan + ' ' + item.tipo_masa}. ${
        item.longitud_gramos + '. Topping: ' + item.topping
      } = $${item.subtotal}
      `;
    })}

    Total a pagar: $${this.calcularTotal()}

    Nombre: ${this.nombre_persona} 

    Mi negocio: ${this.nombre_negocio}

    ${this.tipo_id}: ${this.id_usuario}

    Celular: ${this.celular}

    Fecha entrega: ${this.fecha_entrega}

    Observaciones: ${this.observaciones}
    `;

    if (this._id_db) {
      this.pedidoService
        .create({
          items: this.storage.items,
          usuario: this._id_db,
          observaciones: this.observaciones,
          fecha_entrega: this.fecha_entrega,
          total: this.total,
        })
        .subscribe({
          next: (res: any) => {
            if (res.status == 201) {
              // console.log('Pedido creado desde front', res);
              alert(`${res.message}. Id: ${res.id}`);
            } else {
              console.log('no se pudo crear pedido');
            }
          },
          complete: () => {
            window.open(
              `https://api.whatsapp.com/send?phone=573023882015&text=${mensaje}`,
              '_blank'
            );
            this.limpiarData();
          }, // completeHandler
          error: (err) => {
            console.log('Error creando user', err);
          }, // errorHandler
        });
    } else {
      this.userService
        .create({
          nombre_persona: this.nombre_persona,
          nombre_negocio: this.nombre_negocio,
          tipo_id: this.tipo_id,
          id_usuario: this.id_usuario,
          celular: this.celular,
        })
        .subscribe({
          next: (res: any) => {
            if (res.status == 201) {
              // console.log('Usuario creado desde front', res);
              this._id_db = res.id;
              this.pedidoService
                .create({
                  items: this.storage.items,
                  usuario: res.id,
                  observaciones: this.observaciones,
                  fecha_entrega: this.fecha_entrega,
                  total: this.total,
                })
                .subscribe({
                  next: (res: any) => {
                    if (res.status == 201) {
                      // console.log('Pedido creado desde front', res);
                      alert(`${res.message}. Id: ${res.id}`);
                    } else {
                      console.log('no se pudo crear pedido');
                    }
                  },
                  complete: () => {
                    window.open(
                      `https://api.whatsapp.com/send?phone=573023882015&text=${mensaje}`,
                      '_blank'
                    );
                    this.limpiarData();
                  }, // completeHandler
                  error: (err) => {
                    console.log('Error creando user', err);
                  }, // errorHandler
                });
            } else {
              console.log('no se pudo crear usuario');
            }
          },
          complete: () => {
            //do something
          }, // completeHandler
          error: (err) => {
            console.log('Error creando user', err);
          }, // errorHandler
        });
    }
  }
}
