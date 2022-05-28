import { Component, OnInit } from '@angular/core';
import { Compra, Usuario } from '../../../auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})
export class ComprasComponent implements OnInit {
  usuario!: Usuario;
  compras: Compra[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
    console.log(this.usuario);

    this.buscarCompras();
    console.log(this.compras);
  }

  buscarCompras() {
    this.usuario.compras?.map((compra) => this.compras.push(compra));
  }
}
