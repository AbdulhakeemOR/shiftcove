"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownToLine, ArrowLeft, ArrowRight, Bell, CalendarDays, Check, CheckCheck,
  ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, Coffee, CreditCard,
  Download, Ellipsis, FileSpreadsheet, Filter, LayoutDashboard, LogOut, Menu,
  MoreHorizontal, Plus, Search, Settings, ShieldCheck, Smartphone, Users,
  UserRound, Wallet, X, Zap,
} from "lucide-react";
import { BrandMark } from "./marketing-home";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const people = [
  { name: "Sarah Chen", role: "Store manager", hours: "38.5", status: "On shift", color: "bg-[#c08468]", initials: "SC" },
  { name: "James Wilson", role: "Shift lead", hours: "41.2", status: "On shift", color: "bg-[#57827c]", initials: "JW" },
  { name: "Molly Parker", role: "Barista", hours: "32.0", status: "Available", color: "bg-[#93759b]", initials: "MP" },
  { name: "Ahmed Hassan", role: "Barista", hours: "36.0", status: "Available", color: "bg-[#6983a1]", initials: "AH" },
  { name: "Lily Thompson", role: "Floor staff", hours: "24.5", status: "On leave", color: "bg-[#a17d55]", initials: "LT" },
];
const initialShifts = [
  { id: 1, name: "Sarah Chen", role: "Opener", start: "08:00", end: "16:00", day: 0, color: "teal" },
  { id: 2, name: "James Wilson", role: "Barista", start: "09:00", end: "17:00", day: 0, color: "blue" },
  { id: 3, name: "Molly Parker", role: "Barista", start: "10:00", end: "16:00", day: 0, color: "purple" },
  { id: 4, name: "Ahmed Hassan", role: "Closer", start: "13:00", end: "21:00", day: 0, color: "sand" },
  { id: 5, name: "Sarah Chen", role: "Opener", start: "08:00", end: "16:00", day: 1, color: "teal" },
  { id: 6, name: "Molly Parker", role: "Barista", start: "09:00", end: "17:00", day: 1, color: "purple" },
  { id: 7, name: "James Wilson", role: "Shift lead", start: "12:00", end: "20:00", day: 1, color: "blue" },
  { id: 8, name: "Ahmed Hassan", role: "Opener", start: "08:00", end: "16:00", day: 2, color: "sand" },
  { id: 9, name: "Sarah Chen", role: "Barista", start: "09:00", end: "17:00", day: 2, color: "teal" },
  { id: 10, name: "Molly Parker", role: "Closer", start: "13:00", end: "21:00", day: 2, color: "purple" },
  { id: 11, name: "James Wilson", role: "Opener", start: "08:00", end: "16:00", day: 3, color: "blue" },
  { id: 12, name: "Ahmed Hassan", role: "Barista", start: "10:00", end: "18:00", day: 3, color: "sand" },
  { id: 13, name: "Sarah Chen", role: "Shift lead", start: "12:00", end: "20:00", day: 4, color: "teal" },
  { id: 14, name: "Molly Parker", role: "Opener", start: "08:00", end: "16:00", day: 4, color: "purple" },
  { id: 15, name: "Ahmed Hassan", role: "Barista", start: "09:00", end: "17:00", day: 5, color: "sand" },
  { id: 16, name: "James Wilson", role: "Closer", start: "13:00", end: "21:00", day: 5, color: "blue" },
  { id: 17, name: "Sarah Chen", role: "Opener", start: "08:00", end: "16:00", day: 6, color: "teal" },
];

const navItems = [
  { key: "dashboard", label: "Overview", icon: LayoutDashboard, section: "Workspace" },
  { key: "schedule", label: "Schedule", icon: CalendarDays, section: "Workspace" },
  { key: "swaps", label: "Shift swaps", icon: Zap, section: "Workspace" },
  { key: "timesheets", label: "Timesheets", icon: Clock3, section: "Manage" },
  { key: "payroll", label: "Payroll", icon: Wallet, section: "Manage" },
  { key: "employees", label: "Team", icon: Users, section: "Manage" },
  { key: "settings", label: "Settings", icon: Settings, section: "Other" },
];
const pageTitles = {
  dashboard: "Good morning, Alex", schedule: "Schedule", employees: "Your team", swaps: "Shift swaps",
  timesheets: "Timesheets", payroll: "Payroll", settings: "Settings", mobile: "Employee app preview",
};

export default function ShiftcoveApp({ view }) {
  const [shifts, setShifts] = useState(initialShifts);
  const [toast, setToast] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [search, setSearch] = useState("");
  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  };
  const moveShift = (id, day) => {
    const shift = shifts.find((item) => item.id === id);
    if (!shift || shift.day === day) return;
    setShifts((current) => current.map((item) => item.id === id ? { ...item, day } : item));
    notify(`${shift.name.split(" ")[0]}'s shift moved to ${days[day]} · Available · No conflict`);
  };

  if (view === "mobile") return <MobilePreview />;

  return <div className="app-shell min-h-screen text-navy">
    <aside className="app-sidebar fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col px-4 py-5 text-white lg:flex">
      <Link href="/" className="mb-9 flex items-center gap-2.5 px-2">
        <BrandMark /><span className="font-display text-[20px] font-bold tracking-[-.06em]">shiftcove</span>
      </Link>
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.06] px-3 py-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#dcefed] text-[11px] font-bold text-teal">HP</span>
        <div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">Harbour &amp; Pine</p><p className="mt-0.5 text-[10px] text-white/45">Bristol · Clifton</p></div>
        <ChevronDown size={14} className="text-white/45" />
      </div>
      {["Workspace", "Manage", "Other"].map((section) => <div key={section} className="mb-5">
        <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[.17em] text-white/35">{section}</p>
        <nav className="space-y-1">
          {navItems.filter((item) => item.section === section).map(({ key, label, icon: Icon }) => <Link key={key} href={`/${key === "dashboard" ? "dashboard" : key}`} className={`group flex items-center gap-3 rounded-xl px-3 py-[11px] text-[12px] font-semibold transition ${view === key ? "bg-white/[.12] text-white" : "text-white/60 hover:bg-white/[.07] hover:text-white"}`}>
            <Icon size={16} className={view === key ? "text-[#ff8879]" : "text-white/45 group-hover:text-white"} />{label}
            {key === "swaps" && <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-[#ff6b57] px-1 text-[9px] font-bold text-navy">3</span>}
          </Link>)}
        </nav>
      </div>)}
      <div className="mt-auto rounded-2xl border border-white/10 bg-white/[.06] p-4">
        <div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-semibold text-white/60">Your free trial</span><span className="text-[10px] font-bold text-[#ff9385]">24 days left</span></div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[20%] rounded-full bg-[#ff6b57]" /></div>
        <Link href="/settings" className="mt-3 block text-[10px] font-bold text-white/80 hover:text-white">Explore plans <ArrowRight className="ml-1 inline h-3 w-3" /></Link>
      </div>
      <div className="mt-4 flex items-center gap-3 border-t border-white/10 px-2 pt-4">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#d3e2e0] text-[10px] font-bold text-teal">AM</span>
        <div className="flex-1"><p className="text-[11px] font-bold">Alex Morgan</p><p className="text-[9px] text-white/45">Owner</p></div><MoreHorizontal size={17} className="text-white/50" />
      </div>
    </aside>

    {mobileMenu && <div className="fixed inset-0 z-40 bg-navy/40 lg:hidden" onClick={() => setMobileMenu(false)}>
      <div className="h-full w-[280px] bg-navy p-5 text-white" onClick={(event) => event.stopPropagation()}>
        <div className="mb-8 flex items-center justify-between"><Link href="/dashboard" className="flex items-center gap-2"><BrandMark /><b className="font-display">shiftcove</b></Link><button aria-label="Close menu" onClick={() => setMobileMenu(false)}><X size={20} /></button></div>
        {navItems.map(({ key, label, icon: Icon }) => <Link onClick={() => setMobileMenu(false)} key={key} href={`/${key === "dashboard" ? "dashboard" : key}`} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/80"><Icon size={17} />{label}</Link>)}
        <Link href="/mobile-preview" className="mt-2 flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/80"><Smartphone size={17} />Employee app preview</Link>
      </div>
    </div>}

    <div className="app-workspace min-h-screen lg:pl-[248px]">
      <header className="app-topbar sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-md sm:px-7 lg:px-9">
        <div className="flex items-center gap-3">
          <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" onClick={() => setMobileMenu(true)} aria-label="Open navigation"><Menu size={20} /></button>
          <div><p className="font-display text-[17px] font-bold tracking-tight sm:text-[19px]">{pageTitles[view]}</p><p className="mt-0.5 hidden text-[10px] text-slate-400 sm:block">{view === "dashboard" ? "Here’s what’s happening at your café today." : "Harbour & Pine · Clifton"} </p></div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden sm:block"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search anything..." className="w-[190px] rounded-xl border border-slate-200 bg-[#f8fafa] py-2 pl-9 pr-3 text-xs outline-none transition focus:border-teal/40 focus:bg-white" /></div>
          <button className="relative grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50" aria-label="Notifications" onClick={() => notify("You’re all caught up — no new notifications.")}><Bell size={16} /><span className="absolute right-[8px] top-[7px] h-1.5 w-1.5 rounded-full bg-coral ring-2 ring-white" /></button>
          <Link href="/settings" className="grid h-9 w-9 place-items-center rounded-full bg-[#dcefed] text-[10px] font-bold text-teal">AM</Link>
        </div>
      </header>
      <motion.main key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3, ease: "easeOut" }} className="app-content mx-auto max-w-[1440px] px-4 py-6 sm:px-7 sm:py-8 lg:px-9">
        {view === "dashboard" && <Dashboard />}
        {view === "schedule" && <Schedule shifts={shifts} setShifts={setShifts} weekOffset={weekOffset} setWeekOffset={setWeekOffset} moveShift={moveShift} notify={notify} />}
        {view === "employees" && <Employees search={search} notify={notify} />}
        {view === "swaps" && <Swaps notify={notify} />}
        {view === "timesheets" && <Timesheets notify={notify} />}
        {view === "payroll" && <Payroll notify={notify} />}
        {view === "settings" && <SettingsPage notify={notify} />}
      </motion.main>
      <footer className="px-4 pb-7 text-center text-[10px] text-slate-400 sm:px-7 lg:px-9">© 2025 Shiftcove · Made for teams that keep the day moving</footer>
    </div>
    <AnimatePresence>{toast && <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-navy px-4 py-3 text-xs font-semibold text-white shadow-xl"><Check size={15} className="text-[#8ed3c4]" />{toast}</motion.div>}</AnimatePresence>
  </div>;
}

function Dashboard() {
  return <div className="space-y-6">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm text-slate-500">Tuesday, May 13, 2025 <span className="mx-1.5">·</span><span className="text-teal">A good day to get ahead</span></p></div><Link href="/schedule" className="rounded-xl bg-teal px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-teal/10 transition hover:bg-[#0a5b60]"><Plus size={14} className="mr-1 inline" /> Build this week</Link></div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Staff on duty" value="18" sub="Across 2 locations" icon={Users} tint="teal" />
      <StatCard label="Open shifts" value="3" sub="Needs a little love" icon={CalendarDays} tint="coral" />
      <StatCard label="Pending swaps" value="7" sub="2 need your attention" icon={Zap} tint="purple" />
      <StatCard label="Hours this week" value="542" sub="12% under your target" icon={Clock3} tint="blue" />
    </div>
    <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div><h2 className="font-display text-sm font-bold">This week at a glance</h2><p className="mt-1 text-[10px] text-slate-400">12 — 18 May · All locations</p></div>
          <Link href="/schedule" className="text-[11px] font-bold text-teal">Full schedule <ArrowRight className="ml-1 inline h-3 w-3" /></Link>
        </div>
        <div className="grid grid-cols-7 divide-x divide-slate-100 px-3 py-4 sm:px-5">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => <div key={day} className="px-1 text-center">
            <p className="text-[9px] font-semibold text-slate-400">{day}</p><p className={`mx-auto mt-2 grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold ${i === 1 ? "bg-teal text-white" : "text-navy"}`}>{12 + i}</p>
            <div className="mt-4 flex h-[84px] flex-col justify-end gap-1">
              {Array.from({ length: [3, 5, 4, 3, 5, 4, 2][i] }).map((_, j) => <span key={j} className={`mx-auto h-2 w-full max-w-[34px] rounded-sm ${j === 1 && i === 1 ? "bg-[#ff6b57]" : ["bg-[#b8dfd8]", "bg-[#d0e7e4]", "bg-[#a6cec9]", "bg-[#d7e9e7]"][j % 4]}`} />)}
            </div><p className="mt-2 text-[9px] font-semibold text-slate-500">{[4, 6, 5, 4, 7, 6, 3][i]} shifts</p>
          </div>)}
        </div>
        <div className="mx-5 mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-[9px] font-medium text-slate-500">
          <span><i className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-[#b8dfd8]" />Scheduled</span><span><i className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-coral" />Open shift</span><span className="ml-auto font-semibold text-slate-400">37 shifts published</span>
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200/80 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="font-display text-sm font-bold">Needs a quick look</h2><p className="mt-1 text-[10px] text-slate-400">A few things for you</p></div><span className="grid h-6 w-6 place-items-center rounded-full bg-[#ffede9] text-[10px] font-bold text-[#c25446]">3</span></div>
        <div className="divide-y divide-slate-100 px-5">
          <ActionRow icon={Zap} title="James requested a swap" sub="Sat, 17 May · 09:00–17:00" color="coral" href="/swaps" />
          <ActionRow icon={CalendarDays} title="Friday has an open shift" sub="13:00–21:00 · Barista" color="gold" href="/schedule" />
          <ActionRow icon={Clock3} title="Timesheets are ready" sub="Week ending 18 May" color="teal" href="/timesheets" />
        </div>
        <Link href="/swaps" className="mx-5 my-4 inline-block text-[10px] font-bold text-teal">View all activity <ArrowRight size={12} className="ml-1 inline" /></Link>
      </section>
    </div>
    <div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
      <section className="rounded-2xl border border-slate-200/80 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="font-display text-sm font-bold">Team on the floor</h2><p className="mt-1 text-[10px] text-slate-400">Who’s working right now</p></div><Link href="/employees" className="text-[10px] font-bold text-teal">See your team</Link></div>
        <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">{people.slice(0, 3).map((person) => <div key={person.name} className="flex items-center gap-3 rounded-xl bg-[#f8fafa] p-3"><Avatar person={person} /><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-bold">{person.name}</p><p className="mt-0.5 text-[9px] text-slate-400">{person.role}</p></div><span className="h-2 w-2 rounded-full bg-[#61ae91]" /></div>)}</div>
      </section>
      <section className="relative overflow-hidden rounded-2xl bg-[#e6f1ef] p-5"><div className="absolute -right-7 -top-9 h-36 w-36 rounded-full border-[18px] border-white/40" /><div className="relative"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-teal"><ShieldCheck size={18} /></span><h2 className="font-display mt-4 text-sm font-bold">A little more breathing room.</h2><p className="mt-2 max-w-[260px] text-[11px] leading-5 text-slate-600">Your schedule, swaps, and hours are all in one place. That’s one less group chat to check.</p><Link href="/mobile-preview" className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold text-teal">Preview the team app <ArrowRight size={12} /></Link></div></section>
    </div>
  </div>;
}

function StatCard({ label, value, sub, icon: Icon, tint }) {
  const backgrounds = { teal: "bg-[#e6f2f0] text-teal", coral: "bg-[#fff0ed] text-[#c85a4b]", purple: "bg-[#f0eaf3] text-[#81618b]", blue: "bg-[#e9eff6] text-[#5b7595]" };
  return <motion.div whileHover={{ y: -4 }} transition={{ duration: .2 }} className="app-stat-card rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5"><div className="flex items-center justify-between"><span className="text-[11px] font-semibold text-slate-500">{label}</span><span className={`grid h-8 w-8 place-items-center rounded-xl ${backgrounds[tint]}`}><Icon size={16} /></span></div><p className="font-display mt-4 text-[30px] font-bold leading-none tracking-[-.05em]">{value}</p><p className="mt-2 text-[9px] font-medium text-slate-400">{sub}</p></motion.div>;
}
function ActionRow({ icon: Icon, title, sub, color, href }) {
  return <Link href={href} className="flex items-center gap-3 py-4 transition hover:translate-x-0.5"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${color === "coral" ? "bg-[#fff0ed] text-[#c85a4b]" : color === "gold" ? "bg-[#fff6e6] text-[#b98636]" : "bg-[#e6f2f0] text-teal"}`}><Icon size={16} /></span><div className="min-w-0 flex-1"><p className="text-[10px] font-bold">{title}</p><p className="mt-1 text-[9px] text-slate-400">{sub}</p></div><ChevronRight size={14} className="text-slate-300" /></Link>;
}
function Avatar({ person, size = "normal" }) {
  return <span className={`grid shrink-0 place-items-center rounded-full font-bold text-white ${person.color} ${size === "small" ? "h-7 w-7 text-[8px]" : "h-9 w-9 text-[9px]"}`}>{person.initials}</span>;
}

function Schedule({ shifts, setShifts, weekOffset, setWeekOffset, moveShift, notify }) {
  const [dragId, setDragId] = useState(null);
  const [viewType, setViewType] = useState("Week");
  const [published, setPublished] = useState(false);
  const [activeDay, setActiveDay] = useState(1);
  const weekLabel = weekOffset === 0 ? "May 12 – 18, 2025" : weekOffset > 0 ? "May 19 – 25, 2025" : "May 5 – 11, 2025";
  const shownDays = viewType === "Week" ? days.map((name, index) => ({ name, index })) : [{ name: days[activeDay], index: activeDay }];
  const addShift = () => {
    const id = Math.max(...shifts.map((shift) => shift.id), 0) + 1;
    setShifts((current) => [...current, { id, name: "Sarah Chen", role: "New shift", start: "09:00", end: "17:00", day: 4, color: "teal" }]);
    notify("New shift added to Sarah’s Friday rota · 09:00–17:00");
  };
  return <div className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2"><button onClick={() => viewType === "Day" ? setActiveDay((activeDay + 6) % 7) : setWeekOffset(weekOffset - 1)} className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50" aria-label="Previous period"><ChevronLeft size={17} /></button><button onClick={() => viewType === "Day" ? setActiveDay((activeDay + 1) % 7) : setWeekOffset(weekOffset + 1)} className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50" aria-label="Next period"><ChevronRight size={17} /></button><div className="ml-1"><p className="text-sm font-bold">{viewType === "Day" ? `${days[activeDay]}, ${12 + activeDay + weekOffset * 7} May 2025` : weekLabel}</p><p className="text-[10px] text-slate-400">{viewType === "Day" ? "Day view · Harbour & Pine" : "Week 20 · Harbour & Pine"}</p></div><button onClick={() => { setWeekOffset(0); setActiveDay(1); }} className="ml-2 rounded-lg px-3 py-2 text-[10px] font-bold text-teal hover:bg-[#eaf3f2]">Today</button></div>
      <div className="flex items-center gap-2"><div className="flex rounded-xl border border-slate-200 bg-white p-1">{["Week", "Day"].map((mode) => <button key={mode} onClick={() => setViewType(mode)} className={`rounded-lg px-3 py-1.5 text-[10px] font-bold ${viewType === mode ? "bg-navy text-white" : "text-slate-500"}`}>{mode}</button>)}</div><button onClick={() => { addShift(); }} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-bold text-navy hover:bg-slate-50"><Plus size={13} className="mr-1 inline" />Add shift</button><button onClick={() => { setPublished(!published); notify(published ? "Schedule moved back to draft." : "Schedule published. Your team has been notified."); }} className="rounded-xl bg-teal px-4 py-2.5 text-[10px] font-bold text-white hover:bg-[#0a5b60]">{published ? "Published ✓" : "Publish schedule"}</button></div>
    </div>
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3"><div className="flex items-center gap-2 text-[10px] font-bold text-slate-500"><span className="h-2 w-2 rounded-full bg-teal" />37 shifts scheduled</div><span className="h-4 border-l border-slate-200" /><div className="flex items-center gap-2 text-[10px] font-bold text-[#b65b4e]"><span className="h-2 w-2 rounded-full bg-coral" />3 open shifts</div><span className="h-4 border-l border-slate-200" /><div className="flex items-center gap-2 text-[10px] text-slate-400"><Check size={13} className="text-teal" />Drag a shift to move it to another day</div><button onClick={() => notify("Showing all roles and team members.")} className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><Filter size={15} /></button></div>
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
      <div className={`grid ${viewType === "Week" ? "min-w-[980px] grid-cols-[150px_repeat(7,minmax(112px,1fr))]" : "min-w-[490px] grid-cols-[150px_minmax(300px,1fr)]"}`}>
        <div className="border-b border-r border-slate-100 bg-[#fbfcfc] px-4 py-4 text-[9px] font-bold uppercase tracking-wider text-slate-400">Team · 4</div>
        {shownDays.map(({ name: day, index: i }) => <button onClick={() => setActiveDay(i)} key={day} className={`border-b border-r border-slate-100 px-3 py-3 text-center ${activeDay === i ? "bg-[#f0f7f6]" : "bg-[#fbfcfc]"}`}><span className="block text-[9px] font-bold uppercase text-slate-400">{day}</span><span className={`mx-auto mt-1.5 grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold ${i === (1 + weekOffset + 7) % 7 ? "bg-teal text-white" : "text-navy"}`}>{12 + i + weekOffset * 7}</span><span className="mt-1 block text-[8px] text-slate-400">{shifts.filter((s) => s.day === i).length} shifts</span></button>)}
        {["Sarah Chen", "James Wilson", "Molly Parker", "Ahmed Hassan"].map((name, rowIndex) => {
          const person = people.find((item) => item.name === name);
          return <div key={name} className="contents"><div className="flex items-center gap-2 border-b border-r border-slate-100 px-3 py-3"><Avatar person={person} size="small" /><div className="min-w-0"><p className="truncate text-[10px] font-bold">{name}</p><p className="text-[8px] text-slate-400">{["Manager", "Shift lead", "Barista", "Barista"][rowIndex]}</p></div></div>
            {shownDays.map(({ name: day, index: dayIndex }) => {
              const cellShifts = shifts.filter((shift) => shift.name === name && shift.day === dayIndex);
              return <div key={day} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); const id = Number(event.dataTransfer.getData("shift-id")) || dragId; if (id) moveShift(id, dayIndex); setDragId(null); }} className={`min-h-[116px] border-b border-r border-slate-100 p-1.5 transition ${dragId ? "hover:bg-[#f1f8f7]" : ""}`}>
                {cellShifts.map((shift) => <div key={shift.id} draggable onDragStart={(event) => { setDragId(shift.id); event.dataTransfer.setData("shift-id", String(shift.id)); }} onDragEnd={() => setDragId(null)} className={`shift-card mb-1.5 cursor-grab rounded-lg border px-2 py-2 active:cursor-grabbing ${shift.color === "teal" ? "border-[#cce4e1] bg-[#eaf5f3] text-[#256f6d]" : shift.color === "blue" ? "border-[#d7e1ed] bg-[#eff3f8] text-[#536f91]" : shift.color === "purple" ? "border-[#e5dbe9] bg-[#f5f0f6] text-[#806b8a]" : "border-[#eee0ce] bg-[#f8f3eb] text-[#98734d]"}`}><div className="flex items-center justify-between"><span className="text-[8px] font-extrabold">{shift.start}–{shift.end}</span><Ellipsis size={13} className="opacity-40" /></div><p className="mt-1 text-[8px] font-semibold">{shift.role}</p><p className="mt-1 text-[7px] opacity-60">8 hrs · 1 break</p></div>)}
                {rowIndex === 0 && dayIndex === 4 && <button onClick={() => notify("Open shift · Friday 13:00–21:00 · Barista")} className="w-full rounded-lg border border-dashed border-[#f1b3a9] bg-[#fff4f1] px-2 py-3 text-left text-[8px] font-bold text-[#bc5a4d]"><Plus size={12} className="mr-1 inline" />Open shift <span className="mt-1 block pl-4 font-medium opacity-70">13:00–21:00</span></button>}
                {cellShifts.length === 0 && !(rowIndex === 0 && dayIndex === 4) && <button onClick={() => notify(`Add ${name.split(" ")[0]} to ${day}?`)} className="grid h-full min-h-[72px] w-full place-items-center rounded-lg text-slate-200 opacity-0 transition hover:bg-slate-50 hover:text-slate-400 hover:opacity-100"><Plus size={15} /></button>}
              </div>;
            })}
          </div>;
        })}
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 bg-[#fbfcfc] px-4 py-3 text-[9px] text-slate-400"><span>Estimated labour: <b className="text-navy">£4,336</b></span><span>Scheduled hours: <b className="text-navy">226.5 h</b></span><span className="hidden sm:inline">Last edited just now</span></div>
    </div>
  </div>;
}

function Employees({ search, notify }) {
  const filtered = useMemo(() => people.filter((person) => `${person.name} ${person.role}`.toLowerCase().includes(search.toLowerCase())), [search]);
  return <div className="space-y-5">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm text-slate-500">The people who make Harbour &amp; Pine happen.</p></div><button onClick={() => notify("Invite link copied. Share it with your new teammate.")} className="rounded-xl bg-teal px-4 py-2.5 text-[10px] font-bold text-white hover:bg-[#0a5b60]"><Plus size={14} className="mr-1 inline" />Invite teammate</button></div>
    <div className="grid gap-3 sm:grid-cols-3">
      <MiniStat label="Team members" value="12" caption="Across 2 locations" />
      <MiniStat label="Working today" value="8" caption="2 shifts left to fill" />
      <MiniStat label="On leave" value="1" caption="Back on Thursday" />
    </div>
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="font-display text-sm font-bold">All team members</h2><p className="mt-1 text-[10px] text-slate-400">{filtered.length} people shown</p></div><button onClick={() => notify("Team filters are up to date.")} className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-500"><Filter size={13} className="mr-1 inline" />Filter</button></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[640px] text-left">
        <thead><tr className="border-b border-slate-100 bg-[#fbfcfc] text-[9px] font-bold uppercase tracking-wider text-slate-400"><th className="px-5 py-3">Team member</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Hours this week</th><th className="px-4 py-3">Status</th><th className="px-4 py-3" /></tr></thead>
        <tbody>{filtered.map((person) => <tr key={person.name} className="border-b border-slate-100 last:border-0 hover:bg-[#fbfcfc]"><td className="px-5 py-3.5"><div className="flex items-center gap-3"><Avatar person={person} /><div><p className="text-[11px] font-bold">{person.name}</p><p className="mt-0.5 text-[9px] text-slate-400">{person.name.split(" ")[0].toLowerCase()}@harbourandpine.co.uk</p></div></div></td><td className="px-4 py-3 text-[10px] text-slate-500">{person.role}</td><td className="px-4 py-3"><span className="text-[11px] font-bold">{person.hours} h</span><div className="mt-1 h-1 w-20 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-teal" style={{ width: `${Math.min(Number(person.hours) / 45 * 100, 100)}%` }} /></div></td><td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${person.status === "On shift" ? "bg-[#eaf5f1] text-[#40816c]" : person.status === "On leave" ? "bg-[#f3eff5] text-[#806b8a]" : "bg-slate-100 text-slate-500"}`}>{person.status}</span></td><td className="px-4 py-3 text-right"><button onClick={() => notify(`${person.name}'s profile opened.`)} aria-label={`Open ${person.name}`} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={17} /></button></td></tr>)}</tbody>
      </table>{filtered.length === 0 && <div className="p-8 text-center text-xs text-slate-400">No teammates match &ldquo;{search}&rdquo;.</div>}</div>
      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-[9px] text-slate-400"><span>Showing {filtered.length} of 12 team members</span><button onClick={() => notify("You’re viewing the whole team.")} className="font-bold text-teal">View all <ArrowRight size={12} className="ml-1 inline" /></button></div>
    </section>
  </div>;
}

function Swaps({ notify }) {
  const [requests, setRequests] = useState([
    { id: 1, person: "James Wilson", initials: "JW", color: "bg-[#57827c]", day: "Saturday, 17 May", time: "09:00 – 17:00", role: "Barista · Clifton", reason: "Family event", with: "Sarah Chen", status: "pending" },
    { id: 2, person: "Molly Parker", initials: "MP", color: "bg-[#93759b]", day: "Friday, 16 May", time: "13:00 – 21:00", role: "Closer · Clifton", reason: "University exam", with: "Ahmed Hassan", status: "pending" },
    { id: 3, person: "Ahmed Hassan", initials: "AH", color: "bg-[#6983a1]", day: "Sunday, 18 May", time: "08:00 – 16:00", role: "Opener · Clifton", reason: "Personal appointment", with: "Molly Parker", status: "pending" },
  ]);
  const act = (id, status) => {
    const request = requests.find((item) => item.id === id);
    setRequests((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    if (request) notify(status === "approved" ? `Swap approved — ${request.with} is covering ${request.person.split(" ")[0]}.` : `Swap request from ${request.person.split(" ")[0]} declined.`);
  };
  const pendingCount = requests.filter((request) => request.status === "pending").length;
  return <div className="space-y-5">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm text-slate-500">A little less back-and-forth, a lot more covered shifts.</p></div><button onClick={() => notify("New swap request form opened.")} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[10px] font-bold hover:bg-slate-50"><Plus size={14} className="mr-1 inline" />New request</button></div>
    <div className="grid gap-3 sm:grid-cols-3"><MiniStat label="Needs your attention" value={String(pendingCount).padStart(2, "0")} caption="Requests awaiting review" accent /><MiniStat label="Approved this month" value="12" caption="Your team has it covered" /><MiniStat label="Open shifts" value="03" caption="Still looking for cover" /></div>
    <div className="grid gap-5 xl:grid-cols-[1.4fr_.6fr]">
      <section className="space-y-3">
        <div className="flex items-center justify-between"><div><h2 className="font-display text-sm font-bold">Requests to review</h2><p className="mt-1 text-[10px] text-slate-400">Check the details, then make the call.</p></div><button onClick={() => notify("Showing pending swap requests.")} className="text-[10px] font-bold text-slate-500">All requests <ChevronDown size={12} className="ml-1 inline" /></button></div>
        <AnimatePresence mode="popLayout">
          {requests.map((request) => <motion.article layout key={request.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .97 }} className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3"><span className={`grid h-10 w-10 place-items-center rounded-full text-[10px] font-bold text-white ${request.color}`}>{request.initials}</span><div><div className="flex items-center gap-2"><p className="text-[12px] font-bold">{request.person}</p><span className="rounded-full bg-[#fff3e5] px-2 py-0.5 text-[8px] font-bold text-[#b98636]">{request.status === "pending" ? "Needs review" : request.status}</span></div><p className="mt-1 text-[9px] text-slate-400">Requested a shift swap</p></div></div>
              <button onClick={() => notify(`More options for ${request.person}'s request.`)} aria-label="More swap options" className="rounded-md p-1 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={17} /></button>
            </div>
            <div className="my-4 grid gap-2 rounded-xl bg-[#f7f9f9] p-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><div><p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Shift to cover</p><p className="mt-1 text-[10px] font-bold">{request.day}</p><p className="mt-1 text-[9px] text-slate-500">{request.time} <span className="text-slate-300">·</span> {request.role}</p></div><ArrowRight size={15} className="hidden text-slate-300 sm:block" /><div className="sm:text-right"><p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Covering teammate</p><p className="mt-1 text-[10px] font-bold">{request.with}</p><p className="mt-1 text-[9px] text-slate-500">Reason: {request.reason}</p></div></div>
            {request.status === "pending" ? <div className="flex justify-end gap-2"><button onClick={() => act(request.id, "denied")} className="rounded-lg border border-slate-200 px-4 py-2 text-[9px] font-bold text-slate-600 hover:bg-slate-50">Decline</button><button onClick={() => act(request.id, "approved")} className="rounded-lg bg-coral px-4 py-2 text-[9px] font-bold text-navy transition hover:bg-[#ff806e]"><Check size={13} className="mr-1 inline" />Approve swap</button></div> : <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[9px] font-bold ${request.status === "approved" ? "bg-[#eaf5f1] text-[#40816c]" : "bg-slate-100 text-slate-500"}`}>{request.status === "approved" ? <CheckCheck size={14} /> : <X size={14} />}{request.status === "approved" ? "Swap approved · Team notified" : "Request declined · James notified"}</div>}
          </motion.article>)}
        </AnimatePresence>
        {requests.length === 0 && <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-400">You’re all caught up.</div>}
      </section>
      <div className="space-y-4">
        <section className="overflow-hidden rounded-2xl bg-navy p-5 text-white"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#ff9385]"><Zap size={17} /></span><h2 className="font-display mt-4 text-base font-bold">Swaps that just work.</h2><p className="mt-2 text-[10px] leading-5 text-white/60">Your team can find cover and request a change. You keep the final say, without the 40-message thread.</p><div className="mt-5 flex items-center gap-2 text-[9px] font-semibold text-white/75"><span className="grid h-5 w-5 place-items-center rounded-full bg-white/10"><Check size={11} /></span>Both teammates are notified</div><div className="mt-2 flex items-center gap-2 text-[9px] font-semibold text-white/75"><span className="grid h-5 w-5 place-items-center rounded-full bg-white/10"><Check size={11} /></span>Schedule updates automatically</div></section>
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5"><div className="flex items-center justify-between"><h2 className="font-display text-sm font-bold">Recently approved</h2><button onClick={() => notify("Showing swap history.")} className="text-[9px] font-bold text-teal">View all</button></div><RecentSwap name="Sarah Chen" detail="Thu, 15 May · 09:00–17:00" initials="SC" /><RecentSwap name="Lily Thompson" detail="Wed, 14 May · 12:00–20:00" initials="LT" /></section>
      </div>
    </div>
  </div>;
}
function RecentSwap({ name, detail, initials }) {
  return <div className="mt-4 flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#e6f2f0] text-[9px] font-bold text-teal">{initials}</span><div className="min-w-0 flex-1"><p className="text-[10px] font-bold">{name}</p><p className="mt-0.5 text-[9px] text-slate-400">{detail}</p></div><Check size={14} className="text-teal" /></div>;
}

function Timesheets({ notify }) {
  const rows = [
    { name: "Sarah Chen", role: "Store manager", hours: "38.5", overtime: "0.0", color: "bg-[#c08468]", initials: "SC" },
    { name: "James Wilson", role: "Shift lead", hours: "41.2", overtime: "1.2", color: "bg-[#57827c]", initials: "JW" },
    { name: "Molly Parker", role: "Barista", hours: "32.0", overtime: "0.0", color: "bg-[#93759b]", initials: "MP" },
    { name: "Ahmed Hassan", role: "Barista", hours: "36.0", overtime: "0.0", color: "bg-[#6983a1]", initials: "AH" },
    { name: "Lily Thompson", role: "Floor staff", hours: "24.5", overtime: "0.0", color: "bg-[#a17d55]", initials: "LT" },
  ];
  const csv = () => {
    const content = [["Employee", "Role", "Regular hours", "Overtime hours"], ...rows.map(({ name, role, hours, overtime }) => [name, role, hours, overtime])].map((line) => line.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\r\n");
    downloadFile(content, "shiftcove-timesheets-week-20.csv", "text/csv;charset=utf-8");
    notify("CSV timesheets downloaded.");
  };
  const excel = () => {
    const table = `<table><thead><tr><th>Employee</th><th>Role</th><th>Regular hours</th><th>Overtime hours</th></tr></thead><tbody>${rows.map((row) => `<tr><td>${escapeHtml(row.name)}</td><td>${escapeHtml(row.role)}</td><td>${row.hours}</td><td>${row.overtime}</td></tr>`).join("")}</tbody></table>`;
    downloadFile(`<!doctype html><html><head><meta charset="utf-8"></head><body>${table}</body></html>`, "shiftcove-timesheets-week-20.xls", "application/vnd.ms-excel");
    notify("Excel timesheets downloaded.");
  };
  return <div className="space-y-5">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm text-slate-500">A clean view of the hours your team has worked.</p></div><div className="flex gap-2"><button onClick={csv} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-bold hover:bg-slate-50"><Download size={13} className="mr-1 inline" />Export CSV</button><button onClick={excel} className="rounded-xl bg-teal px-3 py-2.5 text-[10px] font-bold text-white hover:bg-[#0a5b60]"><FileSpreadsheet size={13} className="mr-1 inline" />Export Excel</button></div></div>
    <div className="grid gap-3 sm:grid-cols-3"><MiniStat label="Total hours" value="172.2" caption="This week so far" /><MiniStat label="Overtime" value="1.2 h" caption="Across 1 teammate" accent /><MiniStat label="Ready for payroll" value="5 / 12" caption="7 still need approval" /></div>
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4"><div><h2 className="font-display text-sm font-bold">Weekly timesheet</h2><p className="mt-1 text-[10px] text-slate-400">12 – 18 May 2025 · Clifton location</p></div><div className="flex items-center gap-2"><button onClick={() => notify("Viewing previous week.")} className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500"><ChevronLeft size={15} /></button><button onClick={() => notify("Viewing next week.")} className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500"><ChevronRight size={15} /></button><button onClick={() => notify("Showing all team members.")} className="ml-1 rounded-lg border border-slate-200 px-3 py-2 text-[9px] font-bold text-slate-500"><Filter size={12} className="mr-1 inline" />All staff</button></div></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left"><thead><tr className="border-b border-slate-100 bg-[#fbfcfc] text-[9px] font-bold uppercase tracking-wider text-slate-400"><th className="px-5 py-3">Employee</th><th className="px-4 py-3">Mon – Sun</th><th className="px-4 py-3">Regular hours</th><th className="px-4 py-3">Overtime</th><th className="px-4 py-3">Approval</th></tr></thead><tbody>{rows.map((row, i) => <tr key={row.name} className="border-b border-slate-100 last:border-0"><td className="px-5 py-3.5"><div className="flex items-center gap-3"><span className={`grid h-8 w-8 place-items-center rounded-full text-[8px] font-bold text-white ${row.color}`}>{row.initials}</span><div><p className="text-[10px] font-bold">{row.name}</p><p className="text-[9px] text-slate-400">{row.role}</p></div></div></td><td className="px-4 py-3"><div className="flex w-[130px] gap-1">{days.map((day, j) => <span key={day} title={`${day}: ${j < (i === 4 ? 4 : 5) ? "shift worked" : "no shift"}`} className={`h-1.5 flex-1 rounded-full ${j < (i === 4 ? 4 : 5) ? "bg-[#79b5a7]" : "bg-slate-100"}`} />)}</div><p className="mt-1 text-[8px] text-slate-400">{i === 4 ? "4 shifts" : "5 shifts"} recorded</p></td><td className="px-4 py-3 text-[11px] font-bold">{row.hours} h</td><td className="px-4 py-3 text-[10px] font-semibold text-slate-500">{row.overtime} h</td><td className="px-4 py-3"><button onClick={() => notify(`${row.name}'s timesheet marked as approved.`)} className={`rounded-full px-2.5 py-1 text-[8px] font-bold ${i < 3 ? "bg-[#eaf5f1] text-[#40816c]" : "bg-[#fff4e6] text-[#b98636]"}`}>{i < 3 ? "Approved" : "Review"}</button></td></tr>)}</tbody></table></div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-5 py-3 text-[9px] text-slate-400"><span>Showing 5 of 12 team members</span><span>Last synced just now</span></div>
    </section>
    <div className="flex items-start gap-3 rounded-xl border border-[#dcebe8] bg-[#edf6f4] p-4"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-teal" /><p className="text-[10px] leading-5 text-slate-600">Hours are calculated from scheduled shifts and clock-ins. Review any exceptions before exporting to payroll.</p></div>
  </div>;
}

function Payroll({ notify }) {
  const [sent, setSent] = useState(false);
  return <div className="space-y-5">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm text-slate-500">Take the guesswork out of payday.</p></div><button onClick={() => { setSent(true); notify("Payroll export prepared for 12 team members."); }} className="rounded-xl bg-teal px-4 py-2.5 text-[10px] font-bold text-white hover:bg-[#0a5b60]"><ArrowDownToLine size={14} className="mr-1 inline" />Export payroll</button></div>
    <div className="grid gap-3 sm:grid-cols-3"><MiniStat label="Next payday" value="Fri, 23 May" caption="In 10 days" /><MiniStat label="Gross wages" value="£3,842" caption="Estimated this period" /><MiniStat label="Timesheets approved" value="9 / 12" caption="3 need a final check" accent /></div>
    <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white"><div className="border-b border-slate-100 px-5 py-4"><h2 className="font-display text-sm font-bold">Payroll run · 12–18 May</h2><p className="mt-1 text-[10px] text-slate-400">Review hours before exporting.</p></div><div className="divide-y divide-slate-100">
        {people.slice(0, 4).map((person, i) => <div key={person.name} className="flex items-center gap-3 px-5 py-4"><Avatar person={person} size="small" /><div className="min-w-0 flex-1"><p className="text-[10px] font-bold">{person.name}</p><p className="mt-0.5 text-[9px] text-slate-400">{person.hours} hours · {i === 1 ? "1.2 h overtime" : "No overtime"}</p></div><p className="text-[11px] font-bold">£{["577.50", "659.20", "416.00", "468.00"][i]}</p><button onClick={() => notify(`${person.name}'s payroll details opened.`)} className="rounded-md p-1 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={16} /></button></div>)}
      </div><div className="flex items-center justify-between bg-[#fbfcfc] px-5 py-4"><span className="text-[10px] font-semibold text-slate-500">Estimated total</span><span className="font-display text-lg font-bold">£3,842.40</span></div></section>
      <div className="space-y-4"><section className="rounded-2xl border border-slate-200/80 bg-white p-5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e8f2f1] text-teal"><CreditCard size={17} /></span><h2 className="font-display mt-4 text-sm font-bold">Your payroll workflow</h2><div className="mt-4 space-y-4">{[["Timesheets reviewed", "9 of 12 approved", true], ["Hours checked", "No flagged exceptions", true], ["Export ready", "Waiting on approvals", false]].map(([label, sub, complete]) => <div key={String(label)} className="flex items-center gap-3"><span className={`grid h-6 w-6 place-items-center rounded-full ${complete ? "bg-[#e6f2f0] text-teal" : "bg-[#fff4e6] text-[#b98636]"}`}>{complete ? <Check size={13} /> : <Clock3 size={12} />}</span><div><p className="text-[10px] font-bold">{label}</p><p className="mt-0.5 text-[9px] text-slate-400">{sub}</p></div></div>)}</div></section><section className="rounded-2xl bg-[#e6f2f0] p-5"><h2 className="font-display text-sm font-bold">Want a smoother payday?</h2><p className="mt-2 text-[10px] leading-5 text-slate-600">Export approved hours in a format that’s ready for your payroll provider.</p><button onClick={() => notify("Payroll integrations are coming soon.")} className="mt-4 text-[10px] font-bold text-teal">Explore integrations <ArrowRight size={12} className="ml-1 inline" /></button></section></div>
    </div>
    {sent && <p className="text-[10px] font-semibold text-teal">Your payroll export is ready. You can review it before sending.</p>}
  </div>;
}

function SettingsPage({ notify }) {
  const [toggles, setToggles] = useState({ swaps: true, reminders: true, weekly: false, clockIn: true });
  const toggle = (key) => setToggles((current) => ({ ...current, [key]: !current[key] }));
  return <div className="grid gap-5 xl:grid-cols-[.65fr_1.35fr]">
    <div><p className="text-sm text-slate-500">Make Shiftcove work the way your team works.</p><div className="mt-5 rounded-2xl bg-navy p-5 text-white"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#ff9385]"><Settings size={17} /></span><h2 className="font-display mt-4 text-sm font-bold">Workspace settings</h2><p className="mt-2 text-[10px] leading-5 text-white/60">Your workspace is set up for Harbour &amp; Pine · Clifton.</p></div></div>
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200/80 bg-white"><div className="border-b border-slate-100 px-5 py-4"><h2 className="font-display text-sm font-bold">Business details</h2><p className="mt-1 text-[10px] text-slate-400">The details your team sees.</p></div><div className="grid gap-4 p-5 sm:grid-cols-2"><Field label="Business name" value="Harbour & Pine" /><Field label="Location" value="Clifton, Bristol" /><Field label="Timezone" value="Europe/London" /><Field label="Week starts on" value="Monday" /></div><div className="flex justify-end border-t border-slate-100 px-5 py-3"><button onClick={() => notify("Business details saved.")} className="rounded-lg bg-teal px-4 py-2 text-[9px] font-bold text-white">Save changes</button></div></section>
      <section className="rounded-2xl border border-slate-200/80 bg-white"><div className="border-b border-slate-100 px-5 py-4"><h2 className="font-display text-sm font-bold">Team notifications</h2><p className="mt-1 text-[10px] text-slate-400">Choose what your team hears about.</p></div><div className="divide-y divide-slate-100 px-5">{[
        ["swaps", "Shift swap requests", "Let managers know when a teammate needs cover."],
        ["reminders", "Shift reminders", "Remind team members before their shift starts."],
        ["weekly", "Weekly rota summary", "Send the team their upcoming week on Sunday."],
        ["clockIn", "Clock-in alerts", "Notify a manager when someone clocks in late."],
      ].map(([key, title, copy]) => <div key={key} className="flex items-center gap-4 py-4"><div className="min-w-0 flex-1"><p className="text-[10px] font-bold">{title}</p><p className="mt-1 text-[9px] leading-4 text-slate-400">{copy}</p></div><button onClick={() => toggle(key)} aria-label={`Toggle ${title}`} aria-pressed={toggles[key]} className={`relative h-6 w-11 shrink-0 rounded-full transition ${toggles[key] ? "bg-teal" : "bg-slate-200"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${toggles[key] ? "left-6" : "left-1"}`} /></button></div>)}</div></section>
    </div>
  </div>;
}
function Field({ label, value }) {
  return <label className="block"><span className="mb-1.5 block text-[9px] font-bold text-slate-500">{label}</span><input defaultValue={value} className="w-full rounded-lg border border-slate-200 bg-[#fbfcfc] px-3 py-2.5 text-[10px] outline-none focus:border-teal/50" /></label>;
}

function MobilePreview() {
  const [tab, setTab] = useState("Home");
  return <div className="mobile-preview min-h-screen px-4 py-7 text-navy sm:px-7">
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4"><div><Link href="/dashboard" className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-teal"><ArrowLeft size={13} />Back to workspace</Link><h1 className="font-display mt-2 text-2xl font-bold tracking-tight">Employee app preview</h1><p className="mt-1 text-xs text-slate-500">A calmer home for your team, wherever they are.</p></div><span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[9px] font-bold text-slate-500"><Smartphone size={13} className="mr-1.5 inline" />Mobile view</span></div>
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px_1fr]">
        <div className="hidden pt-12 lg:block"><div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-teal shadow-sm"><Clock3 size={21} /></div><h2 className="font-display text-xl font-bold">Everything you need.<br />Nothing you don’t.</h2><p className="mt-3 max-w-[270px] text-xs leading-6 text-slate-500">Your rota, swap requests, and worked hours in one simple place for every teammate.</p><div className="mt-7 space-y-3 text-[10px] font-semibold text-slate-600">{["See your upcoming shifts", "Ask a teammate to swap", "Keep track of your hours"].map((item) => <p key={item}><Check size={14} className="mr-2 inline text-teal" />{item}</p>)}</div></div>
        <div className="mx-auto w-full max-w-[350px] rounded-[36px] border-[7px] border-navy bg-white p-3 shadow-2xl shadow-navy/15"><div className="mx-auto mb-4 h-5 w-24 rounded-b-2xl bg-navy" /><div className="flex items-center justify-between px-3"><span className="text-[9px] font-bold">9:41</span><span className="flex items-center gap-1 text-[8px] font-bold">●●● ▰</span></div>
          <div className="px-3 pb-2 pt-6"><div className="flex items-center justify-between"><div><p className="text-[10px] text-slate-400">Tuesday, May 13</p><h2 className="font-display mt-1 text-[22px] font-bold tracking-[-.05em]">Good morning,<br />James <span>☀️</span></h2></div><span className="grid h-10 w-10 place-items-center rounded-full bg-[#57827c] text-[11px] font-bold text-white">JW</span></div>
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-navy p-4 text-white"><div><p className="text-[8px] font-semibold text-white/60">YOUR NEXT SHIFT</p><p className="font-display mt-1 text-base font-bold">Today, 9am–5pm</p><p className="mt-1 text-[9px] text-white/60">Barista · Clifton</p></div><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#8ccac1]"><Coffee size={17} /></span></div>
            <div className="mt-6 flex items-center justify-between"><h3 className="font-display text-[12px] font-bold">Coming up</h3><button className="text-[8px] font-bold text-teal" onClick={() => setTab("Schedule")}>Full schedule</button></div>
            <div className="mt-3 space-y-2">{[["MON", "12", "9:00am – 5:00pm"], ["TUE", "13", "9:00am – 5:00pm"], ["THU", "15", "1:00pm – 9:00pm"]].map(([day, date, time], i) => <div key={day} className={`flex items-center gap-3 rounded-xl border p-3 ${i === 1 ? "border-[#cfe4e1] bg-[#f0f7f6]" : "border-slate-100"}`}><div className="w-8 text-center"><p className="text-[7px] font-bold text-slate-400">{day}</p><p className="mt-0.5 text-sm font-bold">{date}</p></div><span className="h-7 w-0.5 rounded-full bg-teal" /><div className="flex-1"><p className="text-[9px] font-bold">{time}</p><p className="mt-0.5 text-[8px] text-slate-400">Clifton · Barista</p></div><ChevronRight size={13} className="text-slate-300" /></div>)}</div>
            <div className="mt-5 flex items-center justify-between"><h3 className="font-display text-[12px] font-bold">Shift swap requests</h3><span className="rounded-full bg-[#fff0ed] px-2 py-1 text-[8px] font-bold text-[#c25446]">1 pending</span></div>
            <div className="mt-3 rounded-xl border border-slate-100 p-3"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#f0eaf3] text-[8px] font-bold text-[#806b8a]">MP</span><div className="flex-1"><p className="text-[9px] font-bold">Molly needs cover</p><p className="mt-0.5 text-[8px] text-slate-400">Friday · 1pm–9pm</p></div><ArrowRight size={13} className="text-slate-300" /></div><button onClick={() => setTab("Swap")} className="mt-3 w-full rounded-lg bg-[#e8f3f1] py-2 text-[8px] font-bold text-teal">Offer to cover</button></div>
          </div>
          <nav className="mt-3 flex justify-around border-t border-slate-100 px-1 pb-1 pt-3">{["Home", "Schedule", "Swap", "Hours", "Profile"].map((item) => <button key={item} onClick={() => setTab(item)} className={`flex flex-col items-center gap-1 text-[7px] font-semibold ${tab === item ? "text-teal" : "text-slate-400"}`}><span className={`grid h-6 w-6 place-items-center rounded-lg ${tab === item ? "bg-[#e8f3f1]" : ""}`}>{item === "Home" ? <LayoutDashboard size={13} /> : item === "Schedule" ? <CalendarDays size={13} /> : item === "Swap" ? <Zap size={13} /> : item === "Hours" ? <Clock3 size={13} /> : <UserRound size={13} />}</span>{item}</button>)}</nav>
          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-navy" />
        </div>
        <div className="hidden pt-14 lg:block"><div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#fff0ed] text-[#c25446]"><Bell size={16} /></span><div><p className="text-[10px] font-bold">One simple app, one less chat.</p><p className="mt-1 text-[9px] text-slate-400">See it in action on the screen.</p></div></div><button onClick={() => setTab("Swap")} className="mt-4 flex w-full items-center justify-between rounded-xl bg-[#f7f9f9] px-3 py-3 text-[9px] font-bold">Try the bottom navigation <ArrowRight size={13} className="text-teal" /></button></div><Link href="/dashboard" className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold text-teal">Back to manager dashboard <ArrowRight size={13} /></Link></div>
      </div>
    </div>
  </div>;
}

function MiniStat({ label, value, caption, accent = false }) {
  return <div className="app-mini-stat rounded-2xl border border-slate-200/80 bg-white p-4"><p className="text-[10px] font-semibold text-slate-500">{label}</p><p className={`font-display mt-2 text-[23px] font-bold tracking-[-.04em] ${accent ? "text-[#bf5d4f]" : "text-navy"}`}>{value}</p><p className="mt-1 text-[9px] text-slate-400">{caption}</p></div>;
}
function downloadFile(content, name, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}
