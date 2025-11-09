// app/tryon/layout.tsx
import React, { ReactNode } from "react";
import { TryOnProvider } from "./TryOnContext";

export default function TryOnLayout({ children }: { children: ReactNode }) {
  return <TryOnProvider>{children}</TryOnProvider>;
}
