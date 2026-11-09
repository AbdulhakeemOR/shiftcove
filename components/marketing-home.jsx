"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3,
  Menu, ShieldCheck, Sparkles, UsersRound, WalletCards,
} from "lucide-react";

const week = [
  { day: "MON", date: "12", shifts: ["Sarah", "James", "Molly"] },
  { day: "TUE", date: "13", shifts: ["Ahmed", "Sarah", "James"] },
  { day: "WED", date: "14", shifts: ["Molly", "Ahmed", "Sarah"] },
  { day: "THU", date: "15", shifts: ["James", "Molly"] },
];

export default function MarketingHome() {
  return (
    <main className="marketing-site overflow-hidden text-navy">
      <header className="marketing-header absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-6 lg:px-10">
          <Link href="/" className="flex items-center gap-2.5">
            <BrandMark />
            <span className="font-display text-[21px] font-bold tracking-[-.06em]">shiftcove</span>
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] font-semibold text-slate-600 md:flex">
            <a href="#product" className="transition hover:text-teal">Product</a>
            <a href="#how-it-works" className="transition hover:text-teal">How it works</a>
            <a href="#teams" className="transition hover:text-teal">For your team</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden px-3 py-2 text-sm font-semibold text-navy transition hover:text-teal sm:block">Log in</Link>
            <Link href="/dashboard" className="rounded-full bg-navy px-5 py-3 text-[13px] font-bold text-white shadow-lg shadow-navy/10 transition hover:-translate-y-0.5 hover:bg-teal">
              Get started <ArrowRight className="ml-1 inline h-4 w-4" />
            </Link>
            <button aria-label="Open menu" className="rounded-full border border-slate-200 p-2.5 md:hidden"><Menu size={18} /></button>
          </div>
        </div>
      </header>

      <section className="marketing-hero relative min-h-[760px] pt-32 lg:min-h-[810px]">
        <div className="absolute inset-0 soft-grid opacity-50" />
        <div className="absolute -right-36 top-20 h-[560px] w-[560px] rounded-full border border-teal/10" />
        <div className="absolute -right-16 top-40 h-[390px] w-[390px] rounded-full border border-teal/10" />
        <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 px-6 pb-20 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:pb-28">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-[#ff6b57] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.13em] text-navy">
              <Sparkles size={14} /> Your rota, finally sorted
            </div>
            <h1 className="font-display max-w-[650px] text-[clamp(3.2rem,6.6vw,5.75rem)] font-bold leading-[.99] tracking-[-.075em]">
              Your rota shouldn&apos;t live in a <span className="relative whitespace-nowrap">group chat.<span className="absolute bottom-1 left-0 -z-0 h-[11px] w-full bg-[#ff6b57]/40" /></span>
            </h1>
            <p className="mt-7 max-w-[490px] text-lg leading-8 text-slate-600">
              Build schedules. Approve swaps. Export payroll. Stop spending Thursday night fixing shifts.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/dashboard" className="rounded-full bg-teal px-6 py-4 text-sm font-bold text-white shadow-xl shadow-teal/20 transition hover:-translate-y-0.5 hover:bg-[#0a5b60]">
                Start your free 30 days <ArrowRight className="ml-2 inline h-4 w-4" />
              </Link>
              <a href="#product" className="group flex items-center gap-2 rounded-full border border-navy/15 px-5 py-4 text-sm font-bold text-navy transition hover:bg-white">
                See how it works <ArrowDownRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
            </div>
            <div className="mt-7 flex items-center gap-3 text-xs font-medium text-slate-500">
              <div className="flex -space-x-2">
                {["S", "J", "M", "A"].map((letter, i) => <span key={letter} className={`grid h-7 w-7 place-items-center rounded-full border-2 border-[#eef3f4] text-[9px] font-bold text-white ${["bg-[#0e6e73]", "bg-[#d58e64]", "bg-[#647a99]", "bg-[#9a6d83]"][i]}`}>{letter}</span>)}
              </div>
              <span>Made for the people who keep things moving</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .75, delay: .12 }} className="relative mx-auto w-full max-w-[640px] lg:ml-auto">
            <motion.div whileHover={{ y: -5 }} transition={{ duration: .25 }} className="absolute -left-7 top-16 z-10 hidden rounded-2xl border border-white/80 bg-white/80 p-4 shadow-xl shadow-navy/10 backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e6f4f1] text-teal"><Check size={19} /></span>
                <div><p className="text-[11px] font-semibold text-slate-400">SWAP APPROVED</p><p className="mt-0.5 text-sm font-bold">James → Sarah</p></div>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: .25 }} className="absolute -right-2 bottom-9 z-10 rounded-2xl border border-white/80 bg-white/85 px-4 py-3 shadow-xl shadow-navy/10 backdrop-blur-xl sm:-right-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Hours this week</p>
              <p className="mt-1 font-display text-2xl font-bold">542 <span className="text-xs font-semibold text-teal">on track</span></p>
            </motion.div>
            <ProductMockup />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#f7f9f8]" style={{ clipPath: "ellipse(56% 100% at 50% 100%)" }} />
      </section>

      <section id="product" className="mx-auto max-w-[1320px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-teal">One calmer way to run a shift</p>
            <h2 className="font-display mt-5 text-4xl font-bold leading-tight tracking-[-.055em] sm:text-5xl">Less chasing.<br />More running your business.</h2>
          </div>
          <p className="max-w-[510px] text-lg leading-8 text-slate-600 lg:justify-self-end">Everything your team needs to stay in sync, from the first rota draft to the final payroll export.</p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            { icon: Clock3, title: "Build a better rota", copy: "See your whole week at a glance. Fill shifts with the right people and spot gaps before they become a scramble." },
            { icon: UsersRound, title: "Swaps, minus the thread", copy: "Give your team a clear way to request cover. Review the details and approve it with a tap." },
            { icon: WalletCards, title: "Hours that add up", copy: "Keep hours visible as the week unfolds, then send clean, payroll-ready timesheets when it’s time." },
          ].map(({ icon: Icon, title, copy }, i) => (
            <motion.article key={title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -6 }} viewport={{ once: true }} transition={{ delay: i * .08, y: { duration: .25 } }} className="feature-card rounded-[26px] border border-slate-200/70 bg-white p-7 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e9f3f2] text-teal"><Icon size={21} /></span>
              <h3 className="font-display mt-7 text-xl font-bold tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">{copy}</p>
              <Link href="/dashboard" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal">Explore Shiftcove <ArrowUpRight size={15} /></Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-navy px-6 py-20 text-white lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#83c4bf]">Your team, on the same page</p><h2 className="font-display mt-5 text-4xl font-bold tracking-[-.06em] sm:text-5xl">From &ldquo;who can cover?&rdquo; to handled.</h2></div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Make the plan", "Share it instantly", "Keep hours in view"].map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[.05] p-5"><span className="font-display text-sm font-bold text-[#ff8c7c]">0{index + 1}</span><p className="mt-5 text-sm font-semibold">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section id="teams" className="px-6 py-24 text-center lg:py-28">
        <div className="mx-auto max-w-2xl">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#e5f2f0] text-teal"><ShieldCheck size={22} /></span>
          <h2 className="font-display mt-6 text-4xl font-bold tracking-[-.06em] sm:text-5xl">Make next week feel different.</h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-slate-500">A clearer rota is a good place to start. Take a look around the Shiftcove prototype.</p>
          <Link href="/dashboard" className="mt-8 inline-flex items-center rounded-full bg-teal px-6 py-4 text-sm font-bold text-white transition hover:bg-[#0a5b60]">Explore the app <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>
      <footer className="border-t border-slate-200 px-6 py-7">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 text-xs text-slate-500 lg:px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-navy"><BrandMark /> shiftcove</Link>
          <span>Thoughtful scheduling for teams that keep the day moving.</span>
          <Link href="/dashboard" className="font-semibold text-teal">Open demo <ChevronDown className="ml-1 inline h-3 w-3 -rotate-90" /></Link>
        </div>
      </footer>
    </main>
  );
}

export function BrandMark({ small = false }) {
  return <span className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-teal ${small ? "h-8 w-8" : "h-9 w-9"}`}>
    <svg aria-hidden="true" viewBox="0 0 48 48" className="h-full w-full">
      <path d="M10 14a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v17a6 6 0 0 1-6 6h-6a6 6 0 0 0-12 0h-2a6 6 0 0 1-6-6V14Z" fill="white" />
      <circle cx="39" cy="9" r="5" fill="#FF6B57" />
    </svg>
  </span>;
}

function ProductMockup() {
  return <div className="product-mockup overflow-hidden rounded-[24px] border border-white/80 bg-white">
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
      <div className="flex items-center gap-2"><BrandMark small /><span className="font-display text-sm font-bold tracking-tight">shiftcove</span></div>
      <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#49a587]" /><span className="text-[10px] font-semibold text-slate-500">Harbour &amp; Pine</span><span className="ml-2 grid h-7 w-7 place-items-center rounded-full bg-[#eef3f4] text-[9px] font-bold">AM</span></div>
    </div>
    <div className="flex min-h-[370px]">
      <div className="hidden w-[138px] shrink-0 bg-navy p-3 sm:block">
        <div className="mb-5 px-2 pt-2 text-[8px] font-bold uppercase tracking-[.17em] text-white/40">Workspace</div>
        {["Overview", "Schedule", "Team", "Swaps", "Timesheets"].map((label, index) => <div key={label} className={`mb-1 flex items-center gap-2 rounded-lg px-2 py-2 text-[9px] font-semibold ${index === 1 ? "bg-white/10 text-white" : "text-white/50"}`}><span className={`h-1.5 w-1.5 rounded-full ${index === 1 ? "bg-[#ff6b57]" : "bg-white/25"}`} />{label}</div>)}
      </div>
      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <div className="mb-5 flex items-center justify-between"><div><p className="text-[9px] font-semibold text-slate-400">MON, 12 MAY — SUN, 18 MAY</p><p className="font-display mt-1 text-[17px] font-bold tracking-tight">Your schedule</p></div><div className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[9px] font-semibold">This week <ChevronDown className="ml-1 inline h-3 w-3" /></div></div>
        <div className="grid grid-cols-[68px_repeat(4,1fr)] gap-x-1.5 gap-y-2.5 text-[8px]">
          <span />
          {week.map(({ day, date }) => <div key={day} className="pb-1 text-center"><span className="block font-bold text-slate-400">{day}</span><span className="mt-0.5 inline-grid h-5 w-5 place-items-center rounded-full bg-[#f0f4f4] font-bold text-navy">{date}</span></div>)}
          {["Sarah", "James", "Molly", "Ahmed"].map((person, i) => <div key={person} className="contents">
            <div className="flex items-center gap-1.5 py-1 font-semibold text-slate-600"><span className={`grid h-5 w-5 place-items-center rounded-full text-[7px] font-bold text-white ${["bg-[#bb7c5e]", "bg-[#537d7c]", "bg-[#8e6e9a]", "bg-[#637fa1]"][i]}`}>{person[0]}</span>{person}</div>
            {week.map(({ day, shifts }, j) => <div key={day} className="min-h-[40px] rounded-md bg-[#f7f9f9] p-1">{shifts.includes(person) && ((i + j) % 4 !== 0) && <div className={`h-7 rounded-[5px] px-1.5 py-1 ${i === 1 && j === 2 ? "bg-[#ffede9] text-[#b84f41]" : "bg-[#dcefed] text-teal"}`}><span className="block text-[7px] font-bold">09:00 — 17:00</span><span className="mt-0.5 block text-[6px] opacity-70">Front of house</span></div>}</div>)}
          </div>)}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#f7f9f9] px-3 py-2.5">
          <div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#ffede9] text-[#c25446]"><Clock3 size={13} /></span><span className="text-[9px] font-semibold">2 swaps need your attention</span></div><ArrowRight size={14} className="text-slate-400" />
        </div>
      </div>
    </div>
  </div>;
}
