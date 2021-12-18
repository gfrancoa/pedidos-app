import { Component, OnInit } from '@angular/core';
import {
  faArrowLeft,
  faTrash,
  faPlus,
  faMinus,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { PedidoService } from '../services/pedido.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  public pen = faPen;
  public total: Number = 0;
  public isFormVisible: Boolean = true;
  public isFormEmptyVisible: Boolean = false;
  public isButtonVisible: Boolean = true;
  public isFormCompleteVisible: Boolean = false;
  public fecha_entrega: String = '';
  public observaciones: String = 'Ninguna';
  public todayDate = new Date().toISOString().split('T')[0];
  closeResult = '';
  //datos usuario

  public nombre_persona: String = '';
  public nombre_negocio: String = '';
  public tipo_id: String = ''; // CC, NIT sin digito de verif
  public id_usuario: String = '';
  public celular: String = '';
  public _id_db: String = ''; //id del usuario en BD. Para crear el pedido
  //datos form editar usuario
  public form: FormGroup;
  public nombrePersona: AbstractControl;
  public nombreNegocio: AbstractControl;
  public tipoId: AbstractControl;
  public idUsuario: AbstractControl;
  public numeroCelular: AbstractControl;
  public opcionesTipoId = ['CC', 'NIT'];
  submitted = false;

  constructor(
    public storage: StorageService,
    public userService: UserService,
    public pedidoService: PedidoService,
    private spinner: NgxSpinnerService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    if (sessionStorage.getItem('items')) {
      let data = JSON.parse(JSON.stringify(sessionStorage.getItem('items')));
      this.storage.items = JSON.parse(data);
    }

    this.form = this.formBuilder.group({
      nombrePersona: ['', Validators.required],
      nombreNegocio: ['', Validators.required],
      tipoId: ['', Validators.required],
      idUsuario: ['', Validators.required],
      numeroCelular: ['', Validators.required],
    });

    this.nombrePersona = this.form.controls['nombrePersona'];
    this.nombreNegocio = this.form.controls['nombreNegocio'];
    this.tipoId = this.form.controls['tipoId'];
    this.idUsuario = this.form.controls['idUsuario'];
    this.numeroCelular = this.form.controls['numeroCelular'];
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  get f() {
    return this.form.controls;
  }

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
    sessionStorage.removeItem('items');
  }

  borrarItem(index: any) {
    this.storage.items.splice(index, 1);
    sessionStorage.setItem('items', JSON.stringify(this.storage.items));
  }

  confirmacionPedido(message: any, id: any) {
    Swal.fire({
      title: 'Pedido exitoso',
      html: `<p class="swal2-text">${message}. Id de pedido: ${id}</p>`,
      icon: 'success',
    });
  }

  confirmacion(index: any) {
    Swal.fire({
      title: '¿Quieres eliminar este item del carrito?',
      // text: '¿Quieres eliminar este item del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.borrarItem(index);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('operation was cancelled');
      }
    });
  }

  lessAmount(index: any) {
    if (this.storage.items[index].cantidad > 1) {
      this.storage.items[index].cantidad =
        this.storage.items[index].cantidad - 1;
      this.storage.items[index].subtotal =
        this.storage.items[index].cantidad *
        this.storage.items[index].precio_unitario;

      setTimeout(() => {
        sessionStorage.setItem('items', JSON.stringify(this.storage.items));
      }, 500);
    } else {
      this.confirmacion(index);
    }
  }

  moreAmount(index: any) {
    this.storage.items[index].cantidad = this.storage.items[index].cantidad + 1;
    this.storage.items[index].subtotal =
      this.storage.items[index].cantidad *
      this.storage.items[index].precio_unitario;

    setTimeout(() => {
      sessionStorage.setItem('items', JSON.stringify(this.storage.items));
    }, 500);
  }

  calcularTotal() {
    this.total = 0;
    for (let i = 0; i < this.storage.items.length; i++) {
      this.total = this.total + this.storage.items[i].subtotal;
    }

    return Number(this.total);
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
    this.spinner.show();
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
        setTimeout(() => {
          this.spinner.hide();
        }, 300);
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
    this.spinner.show();
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
              this.confirmacionPedido(res.message, res.id);
            } else {
              console.log('no se pudo crear pedido');
            }
          },
          complete: () => {
            setTimeout(() => {
              this.spinner.hide();
              window.open(
                `https://api.whatsapp.com/send?phone=573023882015&text=${mensaje}`,
                '_blank'
              );
            }, 300);

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
                      this.confirmacionPedido(res.message, res.id);
                    } else {
                      console.log('no se pudo crear pedido');
                    }
                  },
                  complete: () => {
                    setTimeout(() => {
                      this.spinner.hide();
                      window.open(
                        `https://api.whatsapp.com/send?phone=573023882015&text=${mensaje}`,
                        '_blank'
                      );
                    }, 300);
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

  goBack() {
    this.isFormCompleteVisible = false;
    this.isFormEmptyVisible = false;
    this.isFormVisible = true;
    this.isButtonVisible = true;
    this.nombre_negocio = '';
    this.nombre_persona = '';
    this.tipo_id = '';
    this.celular = '';
  }

  /////////////// EDITAR USUARIO ///////////
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openEditar(content: any) {
    //llenar form para editar

    this.form.setValue({
      nombrePersona: this.nombre_persona,
      nombreNegocio: this.nombre_negocio,
      tipoId: this.tipo_id,
      idUsuario: this.id_usuario,
      numeroCelular: this.celular,
    });

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  edit() {
    this.submitted = true;
    if (this.form.invalid)
      //el return detiene la ejecución así que si la condicion de invalid se
      //cumple no se ejecutará el método add
      return;
    this.userService
      .update(
        {
          nombre_persona: this.nombrePersona.value,
          nombre_negocio: this.nombreNegocio.value,
          tipo_id: this.tipoId.value,
          id_usuario: this.idUsuario.value,
          celular: this.numeroCelular.value,
        },
        this._id_db
      )
      .subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            //si no existe traer los campos para llenar:
            this.modalService.dismissAll();
          }
        },
        complete: () => {
          this.nombre_persona = this.nombrePersona.value;
          this.nombre_negocio = this.nombreNegocio.value;
          this.tipo_id = this.tipoId.value;
          this.id_usuario = this.idUsuario.value;
          this.celular = this.numeroCelular.value;
          this.submitted = false;
        }, // completeHandler
        error: (err) => {
          console.log('Error recuperando usuario por id', err);
        }, // errorHandler
      });
  }
}
