export interface AuthResponse {
  ok: boolean;
  uid?: string;
  name?: string;
  token?: string;
  msg?: string;
  email?: string;
  roll?: string;
  carrito?: [
    {
      IDproducto: string;
      unidades: number;
      _id: string;
      precio: number;
    }
  ];
  compras?: [
    {
      compra: [
        {
          IDproducto: string;
          unidades: number;
          _id: string;
          precio: number;
        }
      ];
      fecha: string;
      precio: number;
    }
  ];
}

export interface Usuario {
  uid?: string;
  name: string;
  email: string;
  roll?: string;
  precio?: number;
  carrito: [
    {
      IDproducto: string;
      unidades: number;
      _id: string;
      precio: number;
    }
  ];
  compras?: [
    {
      compra: [
        {
          IDproducto: string;
          unidades: number;
          _id: string;
          precio: number;
        }
      ];
      fecha: string;
      precio: number;
    }
  ];
}

export interface Compra {
  compra: [
    {
      IDproducto?: string;
      unidades?: number;
      _id?: string;
    }
  ];
  fecha?: string;
  precio?: number;
}
