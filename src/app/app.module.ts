import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NavbarDarkComponent } from './components/navbar-dark/navbar-dark.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    InicioComponent,
    InicioSesionComponent,
    RegistroComponent,
    NavbarDarkComponent,
    EditarPerfilComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
