"use client";

import { HeroUIProvider } from "@heroui/react";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      {children}
    </HeroUIProvider>
  );
}
