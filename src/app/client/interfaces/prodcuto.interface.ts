export interface Producto {
  name: string;
  price: number;
  description: string;
  stock: number;
  categoria?: string;
  _id: string;
  img: string;
}

export interface Categoria {
  ok?: boolean;
  msg?: string;
  name: string;
  img: string;
  _id?: string;
}
