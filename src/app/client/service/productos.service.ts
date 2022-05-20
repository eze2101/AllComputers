import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria, Producto } from '../interfaces/prodcuto.interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Usuario } from '../../auth/interfaces/auth.interface';

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

  crearProducto(producto: Producto) {
    console.log(producto);

    return this.http
      .post<Producto>(`${this.baseUrl}/home/newProduct`, producto)
      .pipe(
        tap(({ ok }) => ok),
        map((resp) => resp.ok),
        catchError((err) => of(err.error.msg))
      );
  }

  editarProducto(id: string, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(
      `${this.baseUrl}/home/producto/${id}`,
      producto
    );
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/home/producto/${id}`);
  }

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

  getProductoXcategoria(termino: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this.baseUrl}/home/productoscategoria?pxc=${termino}`
    );
  }

  //CATEGORIA

  crearCategoria(categoria: Categoria) {
    console.log(categoria);

    return this.http
      .post<Categoria>(`${this.baseUrl}/home/newCategoria`, categoria)
      .pipe(
        tap(({ ok }) => ok),
        map((resp) => resp.ok),
        catchError((err) => of(err.error.msg))
      );
  }

  getCategoriasSugeridas(termino: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(
      `${this.baseUrl}/home/categoria?cat=${termino}&_limit=5`
    );
  }
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/home/categorias`);
  }

  getCategoriaID(id: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.baseUrl}/home/categoria/${id}`);
  }

  editarCategoria(id: string, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(
      `${this.baseUrl}/home/categoria/${id}`,
      categoria
    );
  }

  eliminarCategoria(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/home/categoria/${id}`);
  }

  //IMAGENES

  getImagen(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/dowload/${id}`);
  }

  uploadImagenes(name: string, file: File): Observable<Object> {
    const form = new FormData();
    form.append('name', name);
    form.append('file', file, 'form-data');

    return this.http.post<object>(`${this.baseUrl}/upload`, form);
  }

  /*editarImagenes(id:string, file:File):Observable<any>{
    return this.http.put(`${this.baseUrl}/upload`, file)

  }*/

  agregarACarrito(id: string, usuario: Usuario): Observable<Usuario> {
    console.log(id, usuario);

    return this.http.put<Usuario>(
      `${this.baseUrl}/home/carrito/${id}`,
      usuario
    );
  }

  editarUnidadesCarrito(id: any, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${this.baseUrl}/home/carritos/unidades/${id}`,
      usuario
    );
  }

  EliminarDelCarrito(id: any, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${this.baseUrl}/home/carrito/eliminar/${id}`,
      usuario
    );
  }
}
