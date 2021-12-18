import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { ConfigService } from '../services/config.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public pedidos: any[] = [];
  public config: any;
  closeResult = '';
  public form: FormGroup;
  public observaciones: AbstractControl;
  public fecha_entrega: AbstractControl;
  public total: AbstractControl;
  public totalVar = '';
  public status: AbstractControl;
  public submitted = false;
  public selectedId = '';
  public opciones_status: any;
  public fecha_creacion: any;
  public items: any[] = [];
  public usuario: any;

  constructor(
    public pedidoService: PedidoService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    public configService: ConfigService,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      observaciones: ['', Validators.required],
      fecha_entrega: ['', Validators.required],
      total: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.observaciones = this.form.controls['observaciones'];
    this.fecha_entrega = this.form.controls['fecha_entrega'];
    this.total = this.form.controls['total'];
    this.status = this.form.controls['status'];

    this.opciones_status = this.configService.getConfig().status_pedido;
  }

  ngOnInit(): void {
    this.list();
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.pedidos.length,
    };
  }

  get f() {
    return this.form.controls;
  }

  validacion() {
    console.log(this.form.value);
    this.submitted = true;
    if (this.form.invalid)
      //el return detiene la ejecución así que si la condicion de invalid se
      //cumple no se ejecutará el método edit
      return;
    // this.edit();
  }

  list() {
    this.pedidoService.list().subscribe({
      next: (res: any) => {
        this.pedidos = res;
      },
      complete: () => {}, // completeHandler
      error: (err) => {
        console.log('Error listando pedidos', err);
      }, // errorHandler
    });
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  confirmacion(index: any) {
    Swal.fire({
      title: '¿Estás seguro que quieres eliminar este pedido?',
      // text: '¿Quieres eliminar este item del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.eliminar(index);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('operation was cancelled');
      }
    });
  }

  eliminar(index: any): void {
    this.pedidoService.delete(index).subscribe({
      next: (res: any) => {
        this.list();
      },
      complete: () => {}, // completeHandler
      error: (err) => {
        console.log('Error borrando pedido', err);
      }, // errorHandler
    });
  }

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

  openEditar(content: any, item: any) {
    //llenar form para editar
    console.log('item', item);

    this.form.setValue({
      observaciones: item.observaciones,
      fecha_entrega: item.fecha_entrega,
      total: item.total,
      status: item.status,
    });

    this.selectedId = item._id;
    this.fecha_creacion = new Date(item.fecha_creacion).toLocaleDateString();
    this.items = item.items;
    this.usuario = item.usuario;
    this.totalVar = item.total;

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
    // this.spinner.show();
    // console.log('observaciones', this.observaciones.value);
    // console.log('fecha entrega', this.fecha_entrega.value);
    // console.log('total', this.total.value);
    // console.log('status', this.status.value);
    this.pedidoService
      .update(
        {
          observaciones: this.observaciones.value,
          fecha_entrega: this.fecha_entrega.value,
          total: this.total.value,
          status: this.status.value,
        },
        this.selectedId
      )
      .subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            //si no existe traer los campos para llenar:
            this.modalService.dismissAll();
          }
        },
        complete: () => {
          setTimeout(() => {
            // this.spinner.hide();
            this.confirmacionEdicion();
            this.list();
            this.submitted = false;
          }, 300);
        }, // completeHandler
        error: (err) => {
          console.log('Error recuperando usuario por id', err);
        }, // errorHandler
      });
  }

  confirmacionEdicion() {
    Swal.fire({
      title: 'Actualización exitosa',
      html: `<p class="swal2-text">El pedido fue actualizado exitosamente.</p>`,
      icon: 'success',
    });
  }
}
