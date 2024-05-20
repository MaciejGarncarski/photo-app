"use client";

import { useRouter } from "next/navigation";
import { type ReactElement, useEffect } from "react";

import { useAuth } from "@/hooks/use-auth";

import { Loader } from "@/components/loader/loader";

type Props = {
  children: ReactElement;
  sessionNeeded: boolean;
};

export const ProtectedPage = ({ children, sessionNeeded }: Props) => {
  const router = useRouter();
  const { isSignedIn, isFetching } = useAuth();

  useEffect(() => {
    if (isFetching) {
      return;
    }

    if (isSignedIn && !sessionNeeded) {
      router.replace("/access-denied");
      return;
    }

    if (!isSignedIn && sessionNeeded) {
      router.replace("/auth/sign-in");
      return;
    }
  }, [isFetching, router.replace, isSignedIn, sessionNeeded]);

  if (isFetching) {
    return <Loader size="big" color="accent" marginTop />;
  }

  if ((isSignedIn && sessionNeeded) || (!isSignedIn && !sessionNeeded)) {
    return children;
  }

  return <Loader size="big" color="accent" marginTop />;
};
