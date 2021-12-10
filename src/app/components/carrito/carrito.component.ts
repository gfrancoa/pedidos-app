import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  public arrowLeft = faArrowLeft;

  constructor(public storage: StorageService) {}

  ngOnInit(): void {}
}
