// app/tryon/TryOnContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type TryOnContextType = {
  bodyPreview: string | null;
  sketchPreview: string | null;
  setBodyPreview: (value: string | null) => void;
  setSketchPreview: (value: string | null) => void;
};

const TryOnContext = createContext<TryOnContextType | undefined>(undefined);

export const TryOnProvider = ({ children }: { children: ReactNode }) => {
  const [bodyPreview, setBodyPreview] = useState<string | null>(null);
  const [sketchPreview, setSketchPreview] = useState<string | null>(null);

  return (
    <TryOnContext.Provider
      value={{ bodyPreview, sketchPreview, setBodyPreview, setSketchPreview }}
    >
      {children}
    </TryOnContext.Provider>
  );
};

export const useTryOn = () => {
  const ctx = useContext(TryOnContext);
  if (!ctx) {
    throw new Error("useTryOn must be used within TryOnProvider");
  }
  return ctx;
};
