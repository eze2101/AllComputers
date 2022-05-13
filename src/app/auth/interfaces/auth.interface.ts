export interface AuthResponse {
  ok: boolean;
  uid?: string;
  name?: string;
  token?: string;
  msg?: string;
  email?: string;
  carrito?: [
    {
      IDproduct: string;
      unit: number;
    }
  ];
}

export interface Usuario {
  uid?: string;
  name: string;
  email: string;
  carrito: [
    {
      IDproduct: string;
      unit: number;
    }
  ];
}
