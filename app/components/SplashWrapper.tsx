"use client";

import { useEffect, useState } from "react";
import LoveLoader from "./LoveLoader";

export default function SplashWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoveLoader />;
  }

  return <>{children}</>;
}
