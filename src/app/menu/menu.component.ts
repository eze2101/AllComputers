import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../auth/interfaces/auth.interface';
import { AuthService } from '../auth/services/auth.service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  usuario: Usuario = this.authService.usuario;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  logOut() {
    this.router.navigateByUrl('/auth');
    this.authService.logOut();
  }
}
