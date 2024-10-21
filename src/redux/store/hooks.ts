"use client";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// selectores de redux, config para uso.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// hook para login admin form
import { setUser, clearUser } from "@/src/redux/slices/userSlice";
import { AuthUseCase } from "@/src/useCases/AuthUseCase";
import { FirebaseAuthRepository } from "@/src/data/authRepository";

const authUseCase = new AuthUseCase(new FirebaseAuthRepository());

export function useAdminAuth() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await authUseCase.getCurrentUser();
      if (currentUser && currentUser.tipo_usuario.id === "falopa") {
        dispatch(
          setUser({
            id: currentUser.id,
            name: currentUser.nombre || "Admin User",
            email: currentUser.email,
          })
        );
      } else {
        dispatch(clearUser());
        router.push("/");
      }
    };

    checkAuth();
  }, [dispatch, router]);

  return user.id !== null;
}
