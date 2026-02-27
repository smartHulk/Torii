"use client";

import { useState } from "react";
import ModalComponent from "@/component/modal";

export default function ActivityPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-black px-4 py-2 text-white"
      >
        Ouvrir la modal
      </button>

      <ModalComponent open={open} title="Créer un challenge" onClose={() => setOpen(false)}>
        <p className="text-sm text-gray-600">
          Ici tu mets ton formulaire / contenu.
        </p>

        <div className="mt-4 flex gap-2">
          <button
            className="rounded-xl bg-black px-4 py-2 text-white"
            onClick={() => setOpen(false)}
          >
            OK
          </button>
          <button
            className="rounded-xl border px-4 py-2"
            onClick={() => setOpen(false)}
          >
            Annuler
          </button>
        </div>
      </ModalComponent>
    </div>
  );
}
