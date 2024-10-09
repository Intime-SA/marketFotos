import { cache } from "react";
import { User, UserData } from "./definitions";
import { db } from "./firebaseConfig"; // Asumiendo que tienes Firebase inicializado en este archivo
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";

export async function getUsers(): Promise<User[]> {
  const usersCol = collection(db, "users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      return {
        id: doc.id,
        apellido: data.apellido,
        email: data.email,
        fecha_registro: data.fecha_registro.toDate(),
        nombre: data.nombre,
        status_user: data.status_user,
        telefono: data.telefono,
        tipo_usuario: data.tipo_usuario,
        info_pago: data.info_pago,
      } as User;
    }
  );
  return userList;
}

export async function getUserTypeDistribution() {
  const users = await getUsers();
  const compradores = users.filter(
    (user) => user.tipo_usuario.id === "comprador"
  ).length;
  const fotografos = users.filter(
    (user) => user.tipo_usuario.id === "fotografo"
  ).length;
  return [
    { name: "Compradores", value: compradores },
    { name: "Fotógrafos", value: fotografos },
  ];
}

export async function getUserGrowth() {
  const users = await getUsers();
  const monthlyGrowth = users.reduce((acc, user) => {
    const month = user.fecha_registro.toLocaleString("default", {
      month: "short",
    });
    if (!acc[month]) {
      acc[month] = { fotografos: 0, compradores: 0 };
    }
    if (user.tipo_usuario.id === "fotografo") {
      acc[month].fotografos++;
    } else {
      acc[month].compradores++;
    }
    return acc;
  }, {} as Record<string, { fotografos: number; compradores: number }>);

  return Object.entries(monthlyGrowth).map(([month, data]) => ({
    month,
    fotografos: data.fotografos,
    compradores: data.compradores,
  }));
}

export const getUserData = cache(
  async (id: string): Promise<UserData | null> => {
    try {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        // Convertir el Timestamp a una cadena de fecha formateada
        const fecha_registro =
          userData.fecha_registro instanceof Timestamp
            ? formatDate(userData.fecha_registro.toDate())
            : "Fecha no disponible";

        return {
          id: userSnap.id,
          ...userData,
          fecha_registro,
        } as UserData;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }
);

// Función auxiliar para formatear la fecha
function formatDate(date: Date): string {
  return date.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
