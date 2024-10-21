import { IAuthRepository, IUser } from "@/src/domain/entitys/definitions";

export class AuthUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async signIn(email: string, password: string): Promise<IUser> {
    const user = await this.authRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    console.log(user);
    if (user.tipo_usuario.id !== "falopa") {
      throw new Error(
        "No se puede logear desde esta plataforma de administrador"
      );
    }
    return this.authRepository.signIn(email, password);
  }

  async signOut(): Promise<void> {
    console.log("se intenta singOut authcase");
    return this.authRepository.signOut();
  }

  async getCurrentUser(): Promise<IUser | null> {
    return this.authRepository.getCurrentUser();
  }
}
