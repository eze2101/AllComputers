export interface Producto {
  name: string;
  price: number;
  description: string;
  stock: number;
  categoria: string;
  _id?: string;
  img: string;
  ok?: boolean;
  msg?: string;
}

export interface Categoria {
  name: string;
  img: string;
  file?: File;
  _id?: string;
  ok?: boolean;
  msg?: string;
}
