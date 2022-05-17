import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../client/interfaces/prodcuto.interface';
import { ProductosService } from '../../client/service/productos.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  categorias!: Categoria[];
  img!: any;
  admin: boolean = false;
  url!: string;

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private authService: AuthService
  ) {
    this.admin = this.authService.admin;
  }

  ngOnInit(): void {
    this.url = this.router.url;

    this.productosService.getCategorias().subscribe((categorias) => {
      (this.categorias = categorias), console.log(this.categorias[0].name);

      this.productosService
        .getImagen(this.categorias[0].name)
        .subscribe((resp) => {
          console.log(resp);

          this.img = resp[0];
          console.log(this.img);
        });
    });
  }

  irA(nombre: string) {
    this.router.navigateByUrl(`/${this.url}/${nombre}`);
  }

  editar(name: string) {
    this.router.navigateByUrl(`/${this.url}/crear-editar-categoria/${name}`);
  }
}
