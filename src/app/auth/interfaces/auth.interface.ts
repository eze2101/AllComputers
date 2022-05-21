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
    }
  ];
  compras?: [
    {
      compra: [
        {
          IDproducto: string;
          unidades: number;
          _id: string;
        }
      ];
    }
  ];
}

export interface Usuario {
  uid?: string;
  name: string;
  email: string;
  roll?: string;
  carrito: [
    {
      IDproducto: string;
      unidades: number;
      _id: string;
    }
  ];
  compras?: [
    {
      compra: [
        {
          IDproducto: string;
          unidades: number;
          _id: string;
        }
      ];
    }
  ];
}
