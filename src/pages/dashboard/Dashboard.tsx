import { useMemo, useState, useEffect } from "react";
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
import { getDashboard, type DashboardResponse, type DashboardTask } from "@/api/dashboard";

// Календарь с актуальной датой
function CalendarWidget() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date().getDate();
    const isCurrentMonth =
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Вычисляем дни месяца
    const { days, startDay } = useMemo(() => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        // День недели первого дня (0 = Вс, 1 = Пн, ..., 6 = Сб)
        let startDayOfWeek = firstDay.getDay();
        // Преобразуем: Пн = 0, Вт = 1, ..., Вс = 6
        startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

        const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        return { days: daysArray, startDay: startDayOfWeek };
    }, [year, month]);

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    return (
        <div className="bg-white border border-black rounded-xl p-4 font-mono h-full flex flex-col">
            <div className="flex items-center justify-between mb-2 flex-shrink-0">
                <button
                    onClick={prevMonth}
                    className="inline-grid place-items-center w-6 h-6 rounded-md border border-black text-xs hover:bg-gray-100"
                >
                    &lt;
                </button>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold">{monthNames[month]}</span>
                    <span className="text-xs font-semibold">{year}</span>
                </div>
                <button
                    onClick={nextMonth}
                    className="inline-grid place-items-center w-6 h-6 rounded-md border border-black text-xs hover:bg-gray-100"
                >
                    &gt;
                </button>
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] mb-1 flex-shrink-0">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                    <div key={d} className="py-0.5 font-semibold">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] flex-1">
                {/* Пустые ячейки до начала месяца */}
                {Array.from({ length: startDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="py-1"></div>
                ))}

                {/* Дни месяца */}
                {days.map((d) => (
                    <div
                        key={d}
                        className={[
                            "py-1 rounded-md border border-black flex items-center justify-center",
                            isCurrentMonth && d === today ? "bg-[#ff4fa8]/40 font-bold" : "bg-white"
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
    const [currentTime, setCurrentTime] = useState(new Date());
    const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Загружаем данные дашборда
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);
                const data = await getDashboard();
                console.log(data)
                setDashboardData(data);
                setError(null);
            } catch (err) {
                console.error("Failed to load dashboard:", err);
                setError(err instanceof Error ? err.message : "Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    // Обновляем время каждую секунду
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const timeLabel = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const dateLabel = currentTime.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // Вычисляем мета-информацию для задач
    const getTaskMeta = (task: DashboardTask): string => {
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        const diffTime = dueDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return `${Math.abs(diffDays)} days ago`;
        } else if (diffDays === 0) {
            return "Due Today";
        } else if (diffDays === 1) {
            return "Due Tomorrow";
        } else {
            return `${diffDays} days left`;
        }
    };

    if (loading) {
        return (
            <Page>
                <PageHeader title="Dashboard" />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-lg font-mono">Loading...</div>
                </div>
            </Page>
        );
    }

    if (error || !dashboardData) {
        return (
            <Page>
                <PageHeader title="Dashboard" />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-lg font-mono text-red-600">
                        {error || "Failed to load dashboard"}
                    </div>
                </div>
            </Page>
        );
    }

    const { user, tasks, upcomingSchedules } = dashboardData;

    return (
        <Page>
            <PageHeader title="Dashboard" actions={(
                <div className="bg-white border border-black rounded-xl px-4 py-2 font-mono flex items-center justify-center gap-6 text-xs flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <MapPin size={16} /> Zwickau, Deutschland
                    </div>
                    <div className="h-5 w-px bg-black/30" />
                    <div className="flex items-center gap-2">
                        <CalendarIcon size={16} /> {dateLabel}
                    </div>
                    <div className="h-5 w-px bg-black/30" />
                    <div className="flex items-center gap-2">
                        <Clock size={16} /> {timeLabel}
                    </div>
                </div>)}/>
            <div className="flex-1 flex flex-col gap-4 min-h-0 mb-4">
                {/* top: greeting + calendar + tasks */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[40%]">
                    {/* Greeting / Summary */}
                    <div className="bg-[#b8aee5] text-black rounded-xl border border-black p-4 font-mono flex flex-col justify-between h-full">
                        <div>
                            <p className="text-lg mb-1">Hi, {user.fullName}</p>
                            <p className="text-sm opacity-80">
                                You have {upcomingSchedules.length} lessons to attend this week.<br />
                                You have {tasks.length} tasks to complete!
                            </p>
                        </div>

                        <div className="flex items-center gap-3 w-full">
                            {/* простая «пончик»-диаграмма */}
                            <div className="relative w-24 h-24 grid place-items-center flex-shrink-0">
                                <svg viewBox="0 0 36 36" className="w-24 h-24">
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
                                <span className="absolute text-lg font-extrabold">70%</span>
                            </div>

                            <div className="text-xs">
                                <div className="opacity-70">Your attendance rating</div>
                                <div className="font-extrabold">Awesome 🥳</div>
                            </div>
                        </div>

                        <Link
                            to="/timetable"
                            className="inline-flex items-center justify-between w-full bg-black text-white px-3 py-2 rounded-lg text-sm"
                        >
                            <span>View Schedule</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* Calendar */}
                    <CalendarWidget />

                    {/* Tasks */}
                    <div className="bg-white border border-black rounded-xl p-4 font-mono flex flex-col h-full overflow-hidden">
                        <div className="text-sm font-semibold mb-2 flex-shrink-0">My Tasks</div>
                        <div className="space-y-2 overflow-y-auto flex-1 min-h-0">
                            {tasks.length === 0 ? (
                                <div className="text-xs text-center opacity-50 py-4">No tasks yet</div>
                            ) : (
                                tasks.map((t) => (
                                    <div key={t.id} className="flex items-start gap-3">
                                        <div className="pt-0.5">
                                            {t.status === "DONE" ? (
                                                <CheckCircle2 className="opacity-70" size={18} />
                                            ) : (
                                                <Circle className="opacity-70" size={18} />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[10px] opacity-70 leading-none">
                                                {t.subject.name} | {getTaskMeta(t)}
                                            </div>
                                            <div className="text-sm font-semibold">{t.title}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

               


                {/* bottom: illustration placeholder + upcoming + pomodoro */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0">
                    {/* Left placeholder (картинка из макета можно добавить позже) */}
                    <div className="rounded-xl bg-transparent p-4 flex justify-center items-center min-h-0">
                        <img
                            src={groupProject}
                            alt="Group project illustration"
                            className="w-full max-h-full object-contain select-none"
                            draggable={false}
                        />
                    </div>


                    {/* Upcoming classes */}
                    <div className="bg-white border border-black rounded-xl p-4 font-mono flex flex-col h-full overflow-hidden">
                        <div className="text-sm font-semibold mb-2 flex-shrink-0">Upcoming classes</div>
                        <div className="space-y-2 overflow-y-auto flex-1 min-h-0">
                            {upcomingSchedules.length === 0 ? (
                                <div className="text-xs text-center opacity-50 py-4">No upcoming classes</div>
                            ) : (
                                upcomingSchedules.map((schedule) => {
                                    // const scheduleDate = new Date(schedule.date);
                                    // const startTime = new Date(schedule.startTime);
                                    // const dateLabel = scheduleDate.toLocaleDateString("en-GB", {
                                    //     weekday: "long",
                                    //     day: "numeric",
                                    //     month: "long",
                                    //     year: "numeric",
                                    // });
                                    // const timeLabel = startTime.toLocaleTimeString([], {
                                    //     hour: "2-digit",
                                    //     minute: "2-digit",
                                    // });

                                    return (
                                        <Link
                                            to="/timetable"
                                            key={schedule.id}
                                            className="block rounded-lg border border-black p-2 bg-gradient-to-r from-[#f6b3ff] to-[#a86df4] text-white hover:shadow-lg transition-shadow"
                                            style={{
                                                background: `linear-gradient(to right, ${schedule.subject.color}40, ${schedule.subject.color})`
                                            }}
                                        >
                                            <div className="text-[9px] opacity-90">
                                                {schedule.dayOfWeek} · {schedule.startTime}–{schedule.endTime}
                                            </div>
                                            <div className="text-xs font-extrabold">{schedule.subject.name}</div>
                                        </Link>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Pomodoro mini */}
                    <div className="bg-white border border-black rounded-xl p-4 font-mono flex flex-col h-full overflow-hidden justify-between">
                        <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                            <button className="text-xs font-semibold border-b-2 border-black">Focus</button>
                            <button className="text-xs opacity-60">Break</button>
                            <button className="text-xs opacity-60">Rest</button>
                        </div>

                        {/* header с помидором */}
                        <div className="rounded-lg border border-black bg-[#dff0ff] grid place-items-center p-8 flex-shrink-0 h-2/4">
                            <TomatoIcon className="w-full h-full"/>
                        </div>

                        {/* время */}
                        <div className="text-3xl font-extrabold text-center tracking-wider flex-shrink-0">30:00</div>

                        {/* кнопки */}
                        <div className="flex items-center justify-center gap-2 flex-shrink-0">
                            <Link
                                to="/pomodoro"
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#ff4fa8] text-white border border-black text-xs"
                            >
                                <Play size={14} /> Start
                            </Link>
                            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-black text-xs">
                                <Pause size={14} /> Pause
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </Page>
    );
}
