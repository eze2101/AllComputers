import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Producto } from '../../client/interfaces/prodcuto.interface';
import { ProductosService } from '../../client/service/productos.service';
import { AuthService } from '../../auth/services/auth.service.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  producto!: Producto;
  id!: string;
  path!: string;
  admin: boolean = false;
  img: any;

  constructor(
    private productoService: ProductosService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.admin = this.authService.admin;
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.path = params.get('name')!;
    });

    this.productoService.getProductosSugeridos(this.path!).subscribe((resp) => {
      (this.producto = resp[0]),
        (this.id = this.producto._id!),
        this.buscarImagen();
    });
  }

  editar(name: string) {
    this.router.navigateByUrl(`/admin/crear-editar-producto/${name}`);
  }

  buscarImagen() {
    this.productoService.getImagen(this.producto.img).subscribe((resp) => {
      this.img = resp;
    });
  }
}
