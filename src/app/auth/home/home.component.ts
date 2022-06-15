import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../client/service/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {}
}
