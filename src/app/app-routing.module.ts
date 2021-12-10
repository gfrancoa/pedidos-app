import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './components/carrito/carrito.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  // { path: '', component: InicioComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'iniciosesion', component: InicioSesionComponent },
  { path: 'home', component: ProductListComponent },
  { path: 'cart', component: CarritoComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
