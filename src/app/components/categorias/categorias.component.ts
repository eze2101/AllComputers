import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service.service';
import { Categoria } from '../../client/interfaces/prodcuto.interface';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  categorias!: Categoria[];
  admin: boolean = false;
  url!: string;

  constructor(private router: Router, private authService: AuthService) {
    this.admin = this.authService.admin;
  }

  ngOnInit(): void {
    this.url = this.router.url;

    this.authService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }
}
