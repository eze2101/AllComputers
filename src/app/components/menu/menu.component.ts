import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/client/interfaces/prodcuto.interface';
import { ProductosService } from 'src/app/client/service/productos.service';
import { Usuario } from '../../auth/interfaces/auth.interface';
import { AuthService } from '../../auth/services/auth.service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  usuario: Usuario = this.authService.usuario;
  categorias: Categoria[] = [];
  admin: boolean = false;
  url: string = '/home';

  constructor(
    private router: Router,
    private authService: AuthService,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.productosService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
    this.admin = this.authService.admin;
  }

  logOut() {
    this.router.navigateByUrl('/auth');
    this.authService.logOut();
  }

  irA(nombre: string) {
    if (this.admin) {
      this.url = '/admin';
    }

    this.router.navigateByUrl(`/${this.url}/${nombre}`);
  }
}
