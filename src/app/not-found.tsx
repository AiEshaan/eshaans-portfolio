import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center text-zinc-100 font-mono p-8 relative overflow-hidden">
      {/* Ambient grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glitch text block */}
      <div className="relative text-center z-10 flex flex-col items-center gap-6">
        <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-600">
          Documentary Portfolio // Error
        </span>

        <h1
          className="text-[6rem] font-bold leading-none text-zinc-100 select-none"
          style={{
            textShadow:
              "2px 0 0 rgba(139, 92, 246, 0.6), -2px 0 0 rgba(20, 184, 166, 0.5)",
          }}
        >
          404
        </h1>

        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-zinc-400 tracking-widest uppercase">
            Chapter not found
          </p>
          <p className="text-[10px] text-zinc-600 tracking-wider">
            This page does not exist in the portfolio timeline.
          </p>
        </div>

        {/* Scan line decoration */}
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent my-2" />

        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-zinc-700 text-[10px] tracking-widest uppercase text-zinc-300 hover:text-zinc-100 hover:border-zinc-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-200">◀</span>
          Return to Portfolio
        </Link>
      </div>

      {/* Corner labels */}
      <div className="absolute bottom-6 left-6 text-[8px] text-zinc-700 tracking-widest uppercase">
        Eshaan Mayekar · Portfolio
      </div>
      <div className="absolute bottom-6 right-6 text-[8px] text-zinc-700 tracking-widest uppercase">
        Error · 404
      </div>
    </div>
  );
}
