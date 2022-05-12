import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-producto',
  templateUrl: './input-producto.component.html',
  styleUrls: ['./input-producto.component.css'],
})
export class InputProductoComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    product: [],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  buscar() {
    //this.onEnter.emit(this.termino);
  }

  teclaPresionada() {
    //this.debouncer.next(this.termino);
  }
}
