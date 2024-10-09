import { Timestamp } from "firebase/firestore";

export interface User {
  id: string;
  apellido: string;
  email: string;
  fecha_registro: Date;
  nombre: string;
  status_user: boolean;
  telefono: number;
  tipo_usuario: {
    id: string;
    name: string;
  };
  info_pago?: {
    cuenta: Array<{
      alias: string;
      cbu: string;
      cuil: string;
      entidad: string;
    }>;
  };
}

export type UserData = {
  id: string;
  apellido: string;
  email: string;
  fecha_registro: string;
  info_pago: {
    cuenta: Array<{
      alias: string;
      cbu: string;
      cuil: string;
      entidad: string;
    }>;
  };
  nombre: string;
  status_user: boolean;
  telefono: string;
  tipo_usuario: {
    id: string;
    name: string;
  };
};

export type Product = {
  id: string;
  title: string;
  comision: string;
  monto: number;
};

export type NewProduct = {
  title: string;
  comision: string;
  monto: number;
};
