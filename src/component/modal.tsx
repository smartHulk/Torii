"use client";

import { useEffect } from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function ModalComponent({ open, title, children, onClose }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    // bloque le scroll derrière
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* overlay */}
      <button
        className="absolute inset-0 bg-black/40"
        aria-label="Fermer"
        onClick={onClose}
      />

      {/* panel */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm hover:bg-gray-100"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
