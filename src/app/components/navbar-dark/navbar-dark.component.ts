import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-navbar-dark',
  templateUrl: './navbar-dark.component.html',
  styleUrls: ['./navbar-dark.component.css'],
})
export class NavbarDarkComponent implements OnInit {
  public shoppingIcon = faShoppingCart;

  constructor(public storage: StorageService) {}

  ngOnInit(): void {}
}
