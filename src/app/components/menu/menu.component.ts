import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/client/interfaces/prodcuto.interface';
import { ProductosService } from 'src/app/client/service/productos.service';
import { Usuario } from '../../auth/interfaces/auth.interface';
import { AuthService } from '../../auth/services/auth.service.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

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
  menuComprimido: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private productosService: ProductosService,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.productosService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
    this.admin = this.authService.admin;

    this.breakpointObserver
      .observe(['(min-width: 900px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.menuComprimido = false;
        } else {
          this.menuComprimido = true;
        }
      });
  }

  /*
if (this.breakpointObserver.isMatched('(min-width: 900px)')) {
      console.log('pantalla con un minimo de 900px');
    }
  */
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

/*

 carrito() {
    this.authService.validarToken().subscribe();
    this.router.navigateByUrl('/home/carrito');
  }


this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/carrito']);
    });

 this.productosService.recargarPagina$.emit(true)
this.router.navigateByUrl('/home/carrito');


*/
