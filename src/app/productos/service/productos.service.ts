import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria, Producto } from '../interfaces/prodcuto.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private baseUrl: string = environment.baseUrl;

  private _producto!: Producto[];

  producto$ = new EventEmitter<Producto>();
  categoriaCompleta$ = new EventEmitter<Producto[]>();

  get producto() {
    return { ...this._producto };
  }

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/home/products`);
  }

  getProductoID(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/home/products/${id}`);
  }

  getProductosSugeridos(termino: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this.baseUrl}/home/productos?product=${termino}&_limit=5`
    );
  }
  getCategoriasSugeridas(termino: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(
      `${this.baseUrl}/home/categoria?cat=${termino}&_limit=5`
    );
  }
  getProductoXcategoria(termino: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this.baseUrl}/home/productoscategoria?pxc=${termino}`
    );
  }

  getCaterogrias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/home/categorias`);
  }
}
