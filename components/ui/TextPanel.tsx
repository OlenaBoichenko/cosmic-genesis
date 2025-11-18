"use client";

import { ReactNode } from "react";

interface TextPanelProps {
  children: ReactNode;
  className?: string;
}

export default function TextPanel({ children, className = "" }: TextPanelProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 backdrop-blur-md rounded-2xl border border-white/10" />
      <div className="relative p-8 md:p-12">
        {children}
      </div>
    </div>
  );
}
