"use client";


import { useState } from "react";
import Image from "next/image";

// ===== Brand Theme (muted, low-contrast) =====
const palette = {
  bg: "#F2EADF", // warm sand
  surface: "#FBF8F3", // soft ivory
  text: "#3B3B3B", // soft charcoal
  subtext: "#6B6B6B",
  accent: "#9C8366", // muted clay
  accentSoft: "#CDBAA4", // pale clay
  border: "#E6DFD5",
};

// Replace with your real product images in /public
const IMAGES = {
  heroBox: "/smartbite-box.png",
  glow: "/smartbite-glow.png",
  mix: "/smartbite-mix.png",
  kids: "/smartbite-kids.png",
};

// Survey URL
const SURVEY_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd4AqyFyPnPbdQcwGUU_ngN58LupAFsehGhbPFlPSYNp5QHrw/viewform?usp=header";

export default function LandingPage() {
  const [heroEmail, setHeroEmail] = useState("");
  const [heroStatus, setHeroStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleHeroSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHeroStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: heroEmail }),
      });
      if (res.ok) {
        setHeroStatus("success");
        setHeroEmail("");
      } else {
        setHeroStatus("error");
      }
    } catch {
      setHeroStatus("error");
    }
  }

  return (
    <div style={{ backgroundColor: palette.bg, color: palette.text }}>
      {/* HERO */}
      <section
        className="px-6 md:px-16 py-14 md:py-24 grid md:grid-cols-2 gap-10 items-center"
        style={{
          backgroundImage: `linear-gradient(180deg, ${palette.bg}, ${palette.surface})`,
        }}
      >
        <div className="space-y-5">
          <div className="uppercase tracking-wide text-xs md:text-sm" style={{ color: palette.subtext }}>
            Healthy convenience, redefined
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
            Healthy eating, made effortless.
          </h1>
          <p className="text-base md:text-lg" style={{ color: palette.subtext }}>
            From smoothies to soups, Smart Bite delivers real nutrition with zero hassle — 100% freeze-dried, organic, and full of flavor.
          </p>
          <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-3 pt-2" aria-label="Join the Smart Bite waitlist">
            <label htmlFor="hero-email" className="sr-only">Email</label>
            <input
              id="hero-email"
              type="email"
              name="email"
              required
              placeholder="Your email"
              value={heroEmail}
              onChange={(e) => setHeroEmail(e.target.value)}
              className="px-4 py-3 rounded-2xl w-full sm:w-72 border"
              style={{ borderColor: palette.border, backgroundColor: palette.surface }}
            />
            <button
              type="submit"
              disabled={heroStatus === "loading"}
              className="px-6 py-3 rounded-2xl font-medium shadow-sm transition hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60"
              style={{ backgroundColor: palette.accent, color: "#FFF" }}
            >
              {heroStatus === "loading" ? "Joining..." : "Get Early Access"}
            </button>
          </form>
          <div className="text-sm" aria-live="polite" style={{ color: palette.subtext }}>
            {heroStatus === "success" && "Thanks! You’re on the list."}
            {heroStatus === "error" && "Something went wrong. Please try again."}
          </div>
          <a href="#products" className="underline text-sm" style={{ color: palette.accent }}>
            See our products ↓
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="rounded-3xl overflow-hidden shadow w-full max-w-lg" style={{ backgroundColor: palette.surface }}>
            <Image src={IMAGES.heroBox} alt="Smart Bite packaging box" width={960} height={960} className="w-full h-auto object-cover" priority />
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="px-6 md:px-16 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">Our First Creations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ProductCard
            image={IMAGES.glow}
            title="🥤 SMART GLOW — Shot Pack"
            subtitle="Freeze-Dried Smoothie Powder"
            bullets={["Organic superfoods", "Just add water or milk", "No added sugars"]}
            cta="Reserve Now"
          />
          <ProductCard
            image={IMAGES.mix}
            title="🍲 SMART MIX — Risotto & Soup Pack"
            subtitle="Freeze-Dried Vegetables & Herbs"
            
            bullets={["Vegetable & herb blend", "Cook with rice or add to soups", "Quick & Healthy"]}
            cta="Reserve Now"
          />
          <ProductCard
            image={IMAGES.kids}
            title="🧒 SMART KIDS"
            subtitle="Freeze-Dried Vegetables (Carrot · Zucchini · Pea)"
            bullets={["Organic ingredients", "Kid-friendly", "Healthy Snack"]}
            cta="Reserve Now"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-16 py-16" style={{ backgroundColor: palette.surface }}>
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { e: "🛒", t: "Choose your pack", d: "Smoothies, soups, or kids. Pick what fits your day." },
            { e: "💧", t: "Add water / cook", d: "Rehydrate in minutes or simmer with rice/pasta." },
            { e: "😊", t: "Enjoy anywhere", d: "Balanced food at home, work, or outdoors." },
          ].map((s) => (
            <div key={s.t} className="p-8 rounded-2xl border transition hover:shadow-xl hover:-translate-y-0.5" style={{ borderColor: palette.border }}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full text-xl mb-3" style={{ backgroundColor: "#F0E9DF" }}>{s.e}</div>
              <h3 className="text-xl font-semibold mb-1">{s.t}</h3>
              <p style={{ color: palette.subtext }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SURVEY */}
      <section id="survey" className="px-6 md:px-16 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Help us shape Smart Bite 🌱</h2>
        <p className="max-w-2xl mx-auto mb-8" style={{ color: palette.subtext }}>
          Take our 1-minute survey and get early access + sample perks.
        </p>
        <a
          href={SURVEY_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-block px-6 py-3 rounded-2xl font-medium shadow-sm transition hover:shadow-xl hover:-translate-y-0.5"
          style={{ backgroundColor: palette.accent, color: "#FFF" }}
        >
          Take the Survey →
        </a>
      </section>

      {/* ABOUT */}
      <section className="px-6 md:px-16 py-20 grid md:grid-cols-2 gap-10 items-center" style={{ backgroundColor: palette.surface }}>
        <div>
          <div className="rounded-3xl overflow-hidden shadow w-full">
            <Image src={IMAGES.heroBox} alt="Smart Bite packaging – box and pouches" width={1200} height={900} className="w-full h-auto object-cover" />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold">Why we started Smart Bite</h2>
          <p style={{ color: palette.subtext }}>
            We created Smart Bite because eating healthy shouldn’t be hard. By using freeze-drying, we lock in up to 98% of nutrients from fresh foods — without added sugars or artificial stuff. Crafted in the EU with organic ingredients and a focus on sustainability, Smart Bite brings natural, functional, beautiful food to everyday life.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center py-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Ready for a smarter way to eat?</h2>
        <a href={SURVEY_URL} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-2xl font-medium shadow-sm transition hover:shadow-xl hover:-translate-y-0.5 inline-block" style={{ backgroundColor: palette.accent, color: "#FFF" }}>
          Get Early Access
        </a>
        <p className="mt-3" style={{ color: palette.subtext }}>Get early access & launch perks.</p>
      </section>

      {/* FOOTER */}
      <Footer palette={palette} />
    </div>
  );
}

function ProductCard({
  image,
  title,
  subtitle,
  bullets,
  cta,
}: {
  image: string;
  title: string;
  subtitle: string;
  bullets: string[];
  cta: string;
}) {
  return (
    <div className="rounded-3xl border p-6 md:p-8 flex flex-col transition hover:shadow-xl hover:-translate-y-0.5" style={{ borderColor: palette.border, backgroundColor: palette.surface }}>
      <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl mb-5 bg-white/40">
        <Image src={image} alt={title} width={800} height={1000} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
      <p className="text-sm mt-1" style={{ color: palette.subtext }}>{subtitle}</p>
      <ul className="mt-4 space-y-1 text-sm" style={{ color: palette.subtext }}>
        {bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
      <div className="mt-6">
        <a className="px-5 py-2.5 rounded-2xl font-medium inline-block transition hover:shadow-xl hover:-translate-y-0.5" style={{ backgroundColor: palette.accent, color: "#FFF" }} href="#">
          {cta}
        </a>
      </div>
    </div>
  );
}

function Footer({
  palette,
}: {
  palette: typeof palette;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setStatus("loading");
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="px-6 md:px-16 py-10" style={{ borderTop: `1px solid ${palette.border}` }}>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h3 className="text-lg font-semibold mb-2">Subscribe for updates</h3>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <label htmlFor="newsletter-email" className="sr-only">Email</label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-2xl w-full border"
              style={{ borderColor: palette.border, backgroundColor: palette.surface }}
            />
            <button type="submit" disabled={status === "loading" as any} className="px-5 py-3 rounded-2xl font-medium transition hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60" style={{ backgroundColor: palette.accent, color: "#FFF" }}>
              {status === "loading" ? "Joining..." : "Subscribe"}
            </button>
          </form>
          <div className="mt-2 text-sm" aria-live="polite" style={{ color: palette.subtext }}>
            {status === "success" && "Thanks! Please check your inbox."}
            {status === "error" && "Something went wrong. Please try again."}
          </div>
        </div>
        <div className="text-right space-x-4 text-sm">
          <a href="#" className="underline" style={{ color: palette.accent }}>Instagram</a>
          <a href="#" className="underline" style={{ color: palette.accent }}>Facebook</a>
          <a href="#" className="underline" style={{ color: palette.accent }}>LinkedIn</a>
          <a href="#" className="underline" style={{ color: palette.accent }}>Privacy</a>
          <a href="#" className="underline" style={{ color: palette.accent }}>Terms</a>
        </div>
      </div>
      <p className="text-sm mt-6 text-center" style={{ color: palette.subtext }}>© 2025 SMART BITE. All rights reserved.</p>
    </footer>
  );
}
