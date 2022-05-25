import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  hide = true;
  miFormulario: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(4)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  campoValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  registro() {
    console.log(this.miFormulario.value);

    const { name, email, password } = this.miFormulario.value;

    this.authService.register(name, email, password).subscribe((ok) => {
      console.log(ok);
      if (ok === true) {
        this.router.navigateByUrl('/home');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ok,
          confirmButtonColor: '#3c00bb',
          color: 'black',
        });
      }
    });
  }
}
