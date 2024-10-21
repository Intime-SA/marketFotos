import { IAuthRepository, IUser } from "@/src/domain/entitys/definitions";
import { auth, db } from "../lib/firebaseConfig"; // Asumiendo que tienes un archivo de configuración de Firebase
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

export class FirebaseAuthRepository implements IAuthRepository {
  private async mapFirebaseUser(user: FirebaseUser): Promise<IUser> {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();
    return {
      id: user.uid,
      email: user.email!,
      nombre: user.displayName,
      tipo_usuario: userData?.tipo_usuario || "default",
    };
  }

  async signIn(email: string, password: string): Promise<IUser> {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return this.mapFirebaseUser(userCredential.user);
  }

  async signOut(): Promise<void> {
    await firebaseSignOut(auth);
  }

  async getCurrentUser(): Promise<IUser | null> {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        unsubscribe();
        if (user) {
          resolve(await this.mapFirebaseUser(user));
        } else {
          resolve(null);
        }
      });
    });
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    console.log(userData);
    return {
      id: userDoc.id,
      email: userData.email,
      nombre: userData.nombre || null,
      tipo_usuario: userData.tipo_usuario,
    };
  }
}
