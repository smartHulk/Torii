"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Card = { title: string; img: string };

export default function HomeHero() {
  const cards = useMemo<Card[]>(
    () => [
      {
        title: "Sunset Road",
        img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Blue Hour",
        img: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Night City",
        img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    []
  );

  const [order, setOrder] = useState<number[]>([0, 1, 2]);
  const ordered = order.map((i) => cards[i]);

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);

  const setActive = (idxInRow: number) => {
    setOrder((o) => [...o.slice(idxInRow), ...o.slice(0, idxInRow)]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,.35)), url(https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=2400&q=80)",
          transform: "scale(1.02)",
          filter: "saturate(1.05) contrast(1.02)",
        }}
      />
      {/* Soft color blooms */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 700px at 15% 55%, rgba(120,90,255,.35), transparent 55%), radial-gradient(900px 600px at 85% 30%, rgba(240,120,255,.20), transparent 55%), radial-gradient(1200px 700px at 50% 45%, transparent 35%, rgba(0,0,0,.55) 100%)",
        }}
      />
      {/* Nav */}
      <header className="flex h-[84px] items-center justify-between px-5 sm:px-10 lg:px-14">
        <div className="flex items-center gap-3 select-none">
          <div className="h-10 w-10 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_10px_26px_rgba(0,0,0,.25)]" />
          <div className="text-[14px] font-bold tracking-[0.18em] uppercase opacity-95">
            torii
          </div>
        </div>

        <div className="flex items-center gap-2">
          <IconButton ariaLabel="Menu">
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </IconButton>
          <IconButton ariaLabel="Compte">
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 21a8 8 0 10-16 0"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 11a4 4 0 100-8 4 4 0 000 8z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>
        </div>
      </header>
      {/* Hero */}
      <main className="grid flex-1 grid-cols-1 items-center gap-8 px-5 pb-12 sm:px-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-14 lg:px-14">
        {/* Left */}
        <section className="max-w-[640px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[13px] text-white/70 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-white/85 shadow-[0_0_22px_rgba(255,255,255,.55)]" />
            Découvre nos meilleures expériences
          </div>

          <h1 className="mt-5 text-[40px] leading-[1.05] tracking-[-0.02em] sm:text-[54px] font-bold">
            Harbor Valley
          </h1>

          <p className="mt-3 max-w-[560px] text-[14.5px] leading-relaxed text-white/70">
            Un hero immersif avec fond illustré, surcouche “glass”, et un carousel
            de cartes. Remplace ce texte par ta proposition de valeur.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className="h-11 rounded-2xl border border-white/20 bg-white/10 px-5 font-semibold backdrop-blur-md shadow-[0_14px_40px_rgba(0,0,0,.35)] transition hover:-translate-y-0.5 hover:bg-white/15">
              Explore Now
            </button>
            <button className="h-11 rounded-2xl border border-white/20 bg-black/20 px-5 font-semibold backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/10">
              Voir la collection
            </button>
          </div>
        </section>

        {/* Right */}
        <section className="flex justify-start lg:justify-end">
          <div className="w-full max-w-[520px]">
            <div className="flex items-end justify-start gap-4 overflow-hidden px-1 pb-2 pt-4 lg:justify-end">
              {ordered.map((c, idx) => (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={[
                    "relative h-[230px] w-[150px] sm:h-[260px] sm:w-[170px] flex-none overflow-hidden rounded-[22px]",
                    "border border-white/15 bg-white/10 backdrop-blur-md",
                    "shadow-[0_24px_80px_rgba(0,0,0,.45)]",
                    "transition duration-200",
                    idx === 0
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2.5 opacity-70 saturate-95",
                  ].join(" ")}
                  aria-label={`Ouvrir ${c.title}`}
                >
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    className="object-cover scale-[1.05]"
                    priority={idx === 0}
                    sizes="(max-width: 520px) 150px, 170px"
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-left text-sm font-semibold drop-shadow-[0_10px_26px_rgba(0,0,0,.45)]">
                    {c.title}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2.5">
              <RoundButton onClick={prev} ariaLabel="Précédent">
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </RoundButton>
              <RoundButton onClick={next} ariaLabel="Suivant">
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </RoundButton>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="flex items-center justify-between gap-4 px-5 pb-6 text-[13px] text-white/65 sm:px-10 lg:px-14">
        <div className="flex items-center gap-2">
          <span className="opacity-75">Astuce:</span>
          <span>garde 1 titre fort, 1 phrase, 1 CTA.</span>
        </div>

        <div className="flex items-center gap-2.5">
          <SocialIcon ariaLabel="Facebook" />
          <SocialIcon ariaLabel="Instagram" />
          <SocialIcon ariaLabel="Twitter" />
        </div>
      </footer>
    </div>
  );
}

function IconButton({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      aria-label={ariaLabel}
      className="grid h-[42px] w-[42px] place-items-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/15"
      type="button"
    >
      {children}
    </button>
  );
}

function RoundButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/15"
      type="button"
    >
      {children}
    </button>
  );
}

function SocialIcon({ ariaLabel }: { ariaLabel: "Facebook" | "Instagram" | "Twitter" }) {
  const icon =
    ariaLabel === "Facebook" ? (
      <path d="M13 22v-8h3l1-4h-4V7.5C13 6.4 13.4 6 14.7 6H18V2.2C17.4 2.1 15.8 2 13.9 2 10 2 7.5 4.2 7.5 7.9V10H4v4h3.5v8H13z" />
    ) : ariaLabel === "Instagram" ? (
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.2A3.8 3.8 0 1015.8 12 3.8 3.8 0 0012 8.2zm6.2-.9a.9.9 0 11-.9-.9.9.9 0 01.9.9z" />
    ) : (
      <path d="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.3-1.2 1.6-2.1-.7.5-1.6.8-2.5 1A3.6 3.6 0 0011 8.6c0 .3 0 .6.1.9A10.2 10.2 0 013 4.7a3.6 3.6 0 001.1 4.8c-.6 0-1.2-.2-1.7-.5v.1a3.6 3.6 0 002.9 3.5c-.5.1-1 .1-1.5.1-.4 0-.7 0-1-.1a3.6 3.6 0 003.3 2.5A7.2 7.2 0 012 18.3 10.2 10.2 0 007.5 20c6.6 0 10.2-5.6 10.2-10.4v-.5c.7-.5 1.3-1.1 1.8-1.8z" />
    );

  return (
    <a
      href="#"
      aria-label={ariaLabel}
      className="grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/15"
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-white/90">
        {icon}
      </svg>
    </a>
  );
}
