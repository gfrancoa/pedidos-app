import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  public productos: any[] = []; //lista productos

  constructor(
    public config: ConfigService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.productoService.list().subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          this.productos = res;
        }
      },
      complete: () => {
        console.log('Productos listados');
      }, // completeHandler
      error: () => {
        console.log('Error al listar productos');
      }, // errorHandler
    });
  }
}
