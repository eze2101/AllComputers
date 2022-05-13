import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service.service';
import { Usuario } from '../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  miFormulario: FormGroup = this.fb.group({
    email: ['pereyra@hotmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });
  adminID: string = '62783ce31f9fc7ec5752a96a';
  usuario!: Usuario;
  name!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {}

  login() {
    const { email, password } = this.miFormulario.value;

    this.authService.login(email, password).subscribe((resp) => {
      console.log(resp);

      if (resp.ok === true) {
        console.log(resp.name);

        if (resp.name == 'ezepereyra') {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/home');
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: resp.ok,
        });
      }
    });
  }
}
