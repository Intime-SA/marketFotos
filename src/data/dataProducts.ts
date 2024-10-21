import { NewProduct, Product } from "../domain/entitys/definitions";
import { db } from "../lib/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

export async function getProducts(): Promise<Product[]> {
  const productsCol = collection(db, "products");
  const productSnapshot = await getDocs(productsCol);
  const productList = productSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      comision: data.comision,
      monto: data.monto,
    } as Product;
  });
  return productList;
}

export async function addProduct(newProduct: NewProduct): Promise<Product> {
  const productsCol = collection(db, "products");
  // 1. Creamos una referencia a un documento con ID automático
  const newDocRef = doc(productsCol);
  // 2. Obtenemos el ID generado automáticamente
  const docId = newDocRef.id;
  // 3. Creamos el objeto Product completo con el ID
  const productWithId: Product = {
    ...newProduct,
    id: docId,
  };
  // 4. Guardamos el documento en Firestore usando setDoc
  await setDoc(newDocRef, productWithId);
  console.log(`Producto creado con ID: ${docId}`);
  // 5. Retornamos el objeto Product completo
  return productWithId;
}

export async function deleteProduct(id: string): Promise<void> {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
}

export async function updateProduct(product: Product): Promise<void> {
  const productRef = doc(db, "productos", product.id);
  await setDoc(productRef, product, { merge: true });
}
