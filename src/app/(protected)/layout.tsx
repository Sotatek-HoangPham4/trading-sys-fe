"use client";

import { useRequireAuth } from "@/features/auth/presentation/hooks/useRequireAuth";
import { RootState } from "@/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { loading } = useRequireAuth({
    redirectIfUnauthenticated: "/login",
  });

  const auth = useSelector((state: RootState) => state.auth);
  console.log(auth);

  if (loading) return <div>LoadingProtectedLayout...</div>;

  return <>{children}</>;
}
