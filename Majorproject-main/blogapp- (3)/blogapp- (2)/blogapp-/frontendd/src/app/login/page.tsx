"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAppData, user_service } from "@/context/AppContext";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import Loading from "@/components/loading";

const LoginPage = () => {
  const { isAuth, setIsAuth, loading, setLoading, setUser } = useAppData();

  if (isAuth) return redirect("/blogs");

  const responseGoogle = async (authResult: any) => {
    setLoading(true);
    try {
      const result = await axios.post(`${user_service}/api/v1/login`, {
        code: authResult.code,
      });

      // ✅ STORE AUTH DATA (CRITICAL)
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      // (Optional cookie — not required anymore)
      Cookies.set("token", result.data.token, {
        expires: 5,
        path: "/",
        sameSite: "Strict",
        secure: false,
      });

      setUser(result.data.user);
      setIsAuth(true);

      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Problem while logging you in");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-[350px] m-auto mt-[200px]">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Login to The Reading Retreat</CardTitle>
              <CardDescription>Go to blog app</CardDescription>
              <CardAction>
                <Button variant="link">Sign Up</Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <Button onClick={googleLogin} className="flex gap-2">
                Login with Google
                <img
                  src="/google.png"
                  className="w-6 h-6"
                  alt="google icon"
                />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default LoginPage;
