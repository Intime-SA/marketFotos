import { PaymentCheckout } from "./definitions";
import { db } from "./firebaseConfig";
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";

export type DocumentItem = {
  comision: string;
  document_id: string;
  montoComision: number;
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

export async function createPayment(
  paymentData: Omit<PaymentCheckout, "id">
): Promise<PaymentCheckout> {
  const now = Timestamp.now();

  const paymentWithExtras = {
    ...paymentData,
    date_pay: now,
    documents: [
      {
        comision: "porcentaje",
        document_id: "qDAXwCiUyTHhWORfGxG0",
        montoComision: 20,
        type: "photo",
        ubicacion: "BryonBay",
        unit_price: 10,
        url: "https://media.istockphoto.com/id/143918363/es/foto/pie-alto.jpg?s=612x612&w=0&k=20&c=RChPH41W9XygEkKgOo9rYxN_qV13YF4q6oiSGM94MWs=",
      },
    ],
  };

  const docRef = await addDoc(collection(db, "payments"), paymentWithExtras);

  return {
    id: docRef.id,
    ...paymentWithExtras,
  };
}
