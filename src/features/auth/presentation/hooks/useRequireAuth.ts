"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setCredentials, logout } from "@/store/slices/authSlice";
import { useRefreshTokenMutation } from "@/features/auth/infrastructure/api/authApi";
import toast from "react-hot-toast";

export const useRequireAuth = ({
  redirectIfUnauthenticated,
  redirectIfAuthenticated,
}: {
  redirectIfUnauthenticated?: string;
  redirectIfAuthenticated?: string;
} = {}) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);

  const [refreshTokenMutation] = useRefreshTokenMutation();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = auth.accessToken; // token lưu trong redux memory
      const refreshToken = localStorage.getItem("refreshToken"); // token survive reload

      const authRoutes = ["/login", "/register"];
      console.log(!accessToken, !authRoutes.includes(pathname));
      // Chưa login
      if (!accessToken && !authRoutes.includes(pathname)) {
        console.log("first1");
        if (refreshToken) {
          console.log("first2");

          try {
            const response = await refreshTokenMutation({
              refreshToken,
            }).unwrap();
            dispatch(
              setCredentials({
                ...auth,
                accessToken: response.data.accessToken,
                isAuthenticated: true,
                isTokenExpired: false,
              })
            );
            setLoading(false); // ✅ gọi sau khi refresh xong
          } catch {
            dispatch(logout());
            router.replace(redirectIfUnauthenticated || "/login");
            setLoading(false);
          }
        } else {
          router.replace(redirectIfUnauthenticated || "/login");
          setLoading(false);
        }
      }

      if (
        refreshToken &&
        authRoutes.includes(pathname) &&
        redirectIfAuthenticated
      ) {
        router.replace(redirectIfAuthenticated);
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [
    pathname,
    router,
    redirectIfAuthenticated,
    redirectIfUnauthenticated,
    auth,
    dispatch,
    refreshTokenMutation,
  ]);

  return { loading };
};
