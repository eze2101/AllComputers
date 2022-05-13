import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../auth/interfaces/auth.interface';
import { AuthService } from '../auth/services/auth.service.service';
import { ProductosService } from '../productos/service/productos.service';
import { Categoria } from '../productos/interfaces/prodcuto.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  usuario: Usuario = this.authService.usuario;
  categorias: Categoria[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.productosService.getCaterogrias().subscribe((categorias) => {
      this.categorias = categorias;
      //console.log(this.usuario);
    });
  }

  logOut() {
    this.router.navigateByUrl('/auth');
    this.authService.logOut();
  }

  Usuario() {
    if (this.usuario.name == 'ezepereyra') {
      return true;
    } else return false;
  }
}
