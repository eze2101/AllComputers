import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from '../../client/interfaces/prodcuto.interface';
import { Router } from '@angular/router';
import { ProductosService } from '../../client/service/productos.service';
import { AuthService } from '../../auth/services/auth.service.service';

@Component({
  selector: 'app-tarjeta-categoria',
  templateUrl: './tarjeta-categoria.component.html',
  styleUrls: ['./tarjeta-categoria.component.css'],
})
export class TarjetaCategoriaComponent implements OnInit {
  @Input() categoria!: Categoria;
  @Input() url!: string;
  img!: any;
  admin: boolean = false;

  constructor(
    private router: Router,
    private productosService: ProductosService,
    private authService: AuthService
  ) {
    this.admin = this.authService.admin;
  }

  ngOnInit(): void {
    this.buscarImagen();
  }

  irA(nombre: string) {
    this.router.navigateByUrl(`/${this.url}/${nombre}`);
  }

  buscarImagen() {
    this.productosService.getImagen(this.categoria.img).subscribe((resp) => {
      this.img = resp;
    });
  }

  editar(name: string) {
    this.router.navigateByUrl(`/${this.url}/crear-editar-categoria/${name}`);
  }
}
