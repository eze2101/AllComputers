import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Compra, Usuario } from '../../../auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service.service';
import { Producto } from '../../interfaces/prodcuto.interface';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})
export class ComprasComponent implements OnInit {
  usuario!: Usuario;
  compras: Compra[] = [];
  productos: Producto[] = [];
  index: number = 0;
  //para el pipe i18nPlural
  compraMapa = {
    '=1': '1 producto',
    other: '# productos',
  };

  constructor(
    private authService: AuthService,
    private cdref: ChangeDetectorRef,
    private productosServices: ProductosService
  ) {
    console.log(this.usuario);
    this.usuario = this.authService.usuario;
    this.usuario.compras?.reverse();
    this.buscarCompras();
    console.log(this.compras);
  }

  ngOnInit(): void {
    if (
      this.usuario.compras?.length != this.authService.usuario.compras?.length
    ) {
      console.log(this.usuario);

      this.buscarCompras();
      console.log(this.compras);
      this.cdref.detectChanges();
    }

    // console.log(this.usuario.compras?.length);
    // console.log(this.authService.usuario.compras?.length);

    // console.log(
    //   this.compras.length != this.authService.usuario.compras?.length
    // );
  }

  buscarCompras() {
    this.usuario.compras?.map((compra) => this.compras.push(compra));
  }

  buscarProductos(compra: Compra) {
    compra.compra.map((producto) => {
      let index = this.productos.findIndex(
        (id) => id._id == producto.IDproducto
      );
      if (index != -1) {
        this.index = index;
      } else {
        this.productosServices
          .getProductoID(producto.IDproducto!)
          .subscribe((resp) => {
            this.productos.push(resp);
            let posicion = this.productos.findIndex(
              (id) => id._id == producto.IDproducto
            );
            this.index = posicion;
          });
      }
    });
  }
}
