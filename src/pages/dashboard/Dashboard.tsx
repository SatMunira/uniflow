import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import {
    ArrowRight,
    CheckCircle2,
    Circle,
    Clock,
    MapPin,
    Calendar as CalendarIcon,
    Play,
    Pause,
} from "lucide-react";
import groupProject from "@/assets/group_project.png";
import { TomatoIcon } from "./TomatoIcon";
import { CalendarWidget as CalendarWidgetImported } from "@/components/ui/Calender/CalendarWidget";

// ------ mocks ------
type ClassItem = { id: string; title: string; dateLabel: string; time: string; };
const upcoming: ClassItem[] = [
    { id: "c1", title: "Programming 2", dateLabel: "Monday, 23 October, 2025", time: "08:00" },
    { id: "c2", title: "TIM", dateLabel: "Monday, 23 October, 2025", time: "10:00" },
    { id: "c3", title: "Mathematik", dateLabel: "Monday, 23 October, 2025", time: "12:00" },
    { id: "c4", title: "Physics", dateLabel: "Tuesday, 24 October, 2025", time: "09:00" },
    { id: "c5", title: "Algorithms", dateLabel: "Wednesday, 25 October, 2025", time: "08:30" },
    { id: "c6", title: "English", dateLabel: "Thursday, 26 October, 2025", time: "11:15" },
];


type Task = { id: string; subject: string; title: string; meta?: string; done?: boolean };
const tasks: Task[] = [
    { id: "t1", subject: "Programming 2", title: "Покурить", meta: "Due Today" },
    { id: "t2", subject: "Projekt in der Softwareentwicklung", title: "Подредактать", meta: "Due Today", done: true },
    { id: "t3", subject: "Programming 2", title: "Покурить", meta: "2 days left" },
    { id: "t4", subject: "Projekt in der Softwareentwicklung", title: "Подписать", meta: "3 days ago" },
    { id: "t5", subject: "Programming 2", title: "Покурить", meta: "2 days left" },
    { id: "t6", subject: "Projekt in der Softwareentwicklung", title: "Подписать", meta: "3 days ago" },
];

// маленький статический календарь (для вида)
function CalendarWidget() {
    const days = useMemo(
        () => Array.from({ length: 30 }, (_, i) => i + 1),
        []
    );

    return (
        <div className="bg-white border border-black rounded-xl p-4 font-mono">
            <div className="flex items-center justify-between mb-3">
                <button className="inline-grid place-items-center w-8 h-8 rounded-md border border-black">&lt;</button>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">April</span>
                    <span className="text-sm font-semibold">2021</span>
                </div>
                <button className="inline-grid place-items-center w-8 h-8 rounded-md border border-black">&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                    <div key={d} className="py-1 font-semibold">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {days.map((d) => (
                    <div
                        key={d}
                        className={[
                            "py-2 rounded-md border border-black",
                            d === 7 ? "bg-[#ff4fa8]/20" : "bg-white"
                        ].join(" ")}
                    >
                        {d}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const dateLabel = now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <Page>
            <PageHeader title="Dashboard" />
            <div
                className="
          flex flex-col gap-5
          min-h-[calc(100vh-10px)]  /* 140px ≈ высота хедера + вертикальные паддинги Page; подправь при желании */
        "
            >
                {/* top: greeting + calendar + tasks */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
                    {/* Greeting / Summary */}
                    <div className="bg-[#b8aee5] text-black rounded-xl border border-black p-6 font-mono">
                        <p className="text-xl mb-2">Hi, Adelya Musaevа</p>
                        <p className="text-xs opacity-80">
                            You have 5 lessons to attend this week.<br />
                            Your progress activity is excellent!
                        </p>

                        <div className="flex items-center gap-4 mt-6">
                            {/* простая «пончик»-диаграмма */}
                            <div className="relative w-16 h-16 grid place-items-center">
                                <svg viewBox="0 0 36 36" className="w-16 h-16">
                                    <path
                                        d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#ff4fa8"
                                        strokeWidth="3"
                                        strokeDasharray="70, 100"
                                        strokeLinecap="round"
                                    />
                                    <circle cx="18" cy="18" r="14.5" fill="none" stroke="#000" strokeWidth="1" />
                                </svg>
                                <span className="absolute text-sm font-extrabold">70%</span>
                            </div>

                            <div className="text-sm">
                                <div className="opacity-70">Your attendance rating</div>
                                <div className="font-extrabold">Awesome 🥳</div>
                            </div>
                        </div>

                        <Link
                            to="/timetable"
                            className="inline-flex items-center justify-between w-full mt-6 bg-black text-white px-4 py-3 rounded-lg"
                        >
                            <span>View Schedule</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* Calendar */}
                    <CalendarWidgetImported />

                    {/* Tasks */}
                    <div className="bg-white border border-black rounded-xl p-4 font-mono">
                        <div className="text-lg font-semibold mb-2">My Tasks</div>
                        <div className="space-y-3">
                            {tasks.map((t) => (
                                <div key={t.id} className="flex items-start gap-3">
                                    <div className="pt-0.5">
                                        {t.done ? (
                                            <CheckCircle2 className="opacity-70" size={18} />
                                        ) : (
                                            <Circle className="opacity-70" size={18} />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[10px] opacity-70 leading-none">
                                            {t.subject} {t.meta ? `| ${t.meta}` : ""}
                                        </div>
                                        <div className="text-sm font-semibold">{t.title}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* status strip */}
                <div className="mt-1 bg-white border border-black rounded-xl px-4 py-5 font-mono">
                    <div className="
      grid grid-cols-1 sm:grid-cols-3
      text-md
  ">
                        <div className="flex items-center justify-center gap-2 py-1">
                            <MapPin size={16} />
                            <span>Bishkek, Kyrgyzstan</span>
                        </div>

                        <div className="flex items-center justify-center gap-2 py-1
                    sm:border-l sm:border-black/30">
                            <CalendarIcon size={16} />
                            <span>{dateLabel}</span>
                        </div>

                        <div className="flex items-center justify-center gap-2 py-1
                    sm:border-l sm:border-black/30">
                            <Clock size={16} />
                            <span>{timeLabel}</span>
                        </div>
                    </div>
                </div>


                {/* bottom: illustration placeholder + upcoming + pomodoro */}
                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Left placeholder (картинка из макета можно добавить позже) */}
                    <div className="rounded-xl bg-transparent p-4 h-full align-middle flex justify-center items-center">
                        <img
                            src={groupProject}
                            alt="Group project illustration"
                            className="w-full h-80 md:h-[22rem] object-contain select-none"
                            draggable={false}
                        />
                    </div>


                    {/* Upcoming classes */}
                    <div className="bg-white border border-black rounded-xl p-4 font-mono">
                        <div className="text-lg font-semibold mb-3">Upcoming classes</div>
                        <div className="space-y-3">
                            {upcoming.map((c) => (
                                <Link
                                    to="/timetable"
                                    key={c.id}
                                    className="block rounded-lg border border-black p-3 bg-gradient-to-r from-[#f6b3ff] to-[#a86df4] text-white hover:shadow-lg transition-shadow"
                                >
                                    <div className="text-[10px] opacity-90">{c.dateLabel} · {c.time}</div>
                                    <div className="text-sm font-extrabold">{c.title}</div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Pomodoro mini */}
                    {/* Pomodoro mini */}
                    <div className="bg-white border border-black rounded-xl p-4 font-mono">
                        <div className="flex items-center gap-3 mb-3">
                            <button className="text-sm font-semibold border-b-2 border-black">Focus</button>
                            <button className="text-sm opacity-60">Break</button>
                            <button className="text-sm opacity-60">Rest</button>
                        </div>

                        {/* header с помидором */}
                        <div className="rounded-lg border border-black bg-[#dff0ff] grid place-items-center p-3 mb-4">
                            <TomatoIcon className="w-[180px] h-[170px]" />
                        </div>

                        {/* время */}
                        <div className="text-5xl font-extrabold text-center tracking-wider mt-14">30:00</div>

                        {/* кнопки */}
                        <div className="mt-6 flex items-center justify-center gap-3">
                            <Link
                                to="/pomodoro"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ff4fa8] text-white border border-black"
                            >
                                <Play size={16} /> Start
                            </Link>
                            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-black">
                                <Pause size={16} /> Pause
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </Page>
    );
}
