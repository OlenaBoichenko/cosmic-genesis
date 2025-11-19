"use client";

import { ReactNode } from "react";

interface TextPanelProps {
  children: ReactNode;
  className?: string;
}

export default function TextPanel({ children, className = "" }: TextPanelProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 backdrop-blur-md rounded-lg md:rounded-2xl border border-white/10" />
      <div className="relative p-3 sm:p-5 md:p-8 lg:p-12">
        {children}
      </div>
    </div>
  );
}
