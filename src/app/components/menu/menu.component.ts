import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { AuthService } from '../../auth/services/auth.service.service';

import { Categoria } from 'src/app/client/interfaces/prodcuto.interface';
import { Usuario } from '../../auth/interfaces/auth.interface';

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
    public breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.categorias = this.authService.categorias;
    this.admin = this.authService.admin;

    this.breakpointObserver
      .observe(['(min-width: 1060px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.menuComprimido = false;
        } else {
          this.menuComprimido = true;
        }
      });
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
