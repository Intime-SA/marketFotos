import { db } from "./firebaseConfig";
import { collection, getDocs, Timestamp } from "firebase/firestore";

export type DocumentItem = {
  comision: string;
  montoComision: string;
  type: string;
  ubicacion: string;
  unit_price: number;
  url: string;
};

export type Payment = {
  date_pay: Timestamp;
  documents: DocumentItem[];
  id: string;
  id_comprador: string;
  id_fotografo: string;
  id_payment: string;
  status: string;
  total: number;
};

export async function getPayments(): Promise<Payment[]> {
  const paymentsCol = collection(db, "payments");
  const paymentSnapshot = await getDocs(paymentsCol);
  const paymentList = paymentSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      date_pay: data.date_pay,
      documents: data.documents.map((document: DocumentItem) => ({
        comision: document.comision,
        montoComision: document.montoComision,
        type: document.type,
        ubicacion: document.ubicacion,
        unit_price: document.unit_price,
        url: document.url,
      })),
      id: data.id,
      id_comprador: data.id_comprador,
      id_fotografo: data.id_fotografo,
      id_payment: data.id_payment,
      status: data.status,
      total: data.total,
    } as Payment;
  });
  return paymentList;
}
