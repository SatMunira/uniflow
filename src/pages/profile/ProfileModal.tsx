import { Link } from "react-router-dom";
import {
  Mail, MapPin, Phone, Pencil, LogOut, CalendarDays, Clock, UserRound
} from "lucide-react";
import Modal from "@/components/ui/Modal/Modal";

export type ProfileData = {
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatarUrl?: string;
  attendancePct?: number; // 0..100
  focusMinutes?: number;
  footer?: React.ReactNode;
};

function Avatar({
  name,
  src,
  size = 96,
}: { name: string; src?: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return src ? (
    <img
      src={src}
      alt={name}
      className="inline-block rounded-full border border-black object-cover"
      style={{ width: size, height: size }}
      draggable={false}
    />
  ) : (
    <div
      className="inline-grid place-items-center rounded-full border border-black bg-white font-mono font-extrabold"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
}

function Donut({ value = 70 }: { value?: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="relative w-20 h-20 grid place-items-center">
      <svg viewBox="0 0 36 36" className="w-20 h-20">
        <path
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#ff4fa8"
          strokeWidth="3"
          strokeDasharray={`${clamped}, 100`}
          strokeLinecap="round"
        />
        <circle cx="18" cy="18" r="14.5" fill="none" stroke="#000" strokeWidth="1" />
      </svg>
      <span className="absolute text-sm font-extrabold font-mono">{clamped}%</span>
    </div>
  );
}

export default function ProfileModal({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: ProfileData;
}) {
  const {
    name,
    role = "Student",
    email,
    phone,
    location,
    avatarUrl,
    attendancePct = 70,
    focusMinutes = 120,
  } = data;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3 font-mono">
          <Avatar name={name} src={avatarUrl} size={40} />
          <div className="leading-tight">
            <div className="text-sm font-extrabold">{name}</div>
            <div className="text-[11px] opacity-70">{role}</div>
          </div>
        </div>
      }
      width="960px"
      height="680px"
      headerBg="#B8AEE5"
      contentBg="#FEFFEF"
      footerBg="#FEFFEF"
      footerHeight="0px"
      footer={null}
    >
      {/* BODY */}
      <div className="font-mono h-full grid grid-cols-1 lg:grid-cols-3 gap-5 p-4">
        {/* LEFT — профиль + действия */}
        <section className="bg-white border border-black rounded-xl p-4 flex flex-col items-center gap-4">
          <Avatar name={name} src={avatarUrl} size={112} />
          <div className="text-center">
            <div className="text-base font-extrabold">{name}</div>
            <div className="text-xs opacity-70">{role}</div>
          </div>

          <div className="w-full space-y-2 text-sm">
            {location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} /> {location}
              </div>
            )}
            {email && (
              <div className="flex items-center gap-2">
                <Mail size={16} /> {email}
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} /> {phone}
              </div>
            )}
          </div>

          <div className="w-full h-px bg-black/20 my-2" />

          <div className="grid grid-cols-2 gap-2 w-full">
            <Link
              to="/profile" // можешь заменить на свою страницу редактирования
              className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white border border-black hover:shadow-lg transition"
            >
              <Pencil size={16} /> Edit
            </Link>
            <Link
              to="/logout"
              className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#ff4fa8] text-white border border-black"
            >
              <LogOut size={16} /> Logout
            </Link>
          </div>
        </section>

        {/* MIDDLE — статус/метрики */}
        <section className="bg-white border border-black rounded-xl p-4 flex flex-col gap-4">
          <div className="text-sm font-semibold">Status</div>

          <div className="flex items-center gap-4">
            <Donut value={attendancePct} />
            <div className="text-sm">
              <div className="opacity-70">Attendance rating</div>
              <div className="font-extrabold">{attendancePct >= 80 ? "Awesome 🥳" : "Good 👍"}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-black bg-[#dff0ff] p-3">
              <div className="text-[11px] opacity-70 flex items-center gap-2">
                <CalendarDays size={14} /> Upcoming
              </div>
              <div className="text-base font-extrabold">3 classes</div>
              <Link to="/timetable" className="text-xs underline">View schedule</Link>
            </div>

            <div className="rounded-lg border border-black bg-[#ffe9f3] p-3">
              <div className="text-[11px] opacity-70 flex items-center gap-2">
                <Clock size={14} /> Focus today
              </div>
              <div className="text-base font-extrabold">{focusMinutes} min</div>
              <Link to="/pomodoro" className="text-xs underline">Open Pomodoro</Link>
            </div>
          </div>

          <div className="rounded-lg border border-black bg-[#f6f1ff] p-3">
            <div className="text-[11px] opacity-70 flex items-center gap-2">
              <UserRound size={14} /> About
            </div>
            <p className="text-sm mt-1">
              Motivated learner focusing on programming, algorithms and TIM. Loves neat UI and pastel palettes.
            </p>
          </div>
        </section>

        {/* RIGHT — быстрые ссылки */}
        <section className="bg-white border border-black rounded-xl p-4 flex flex-col gap-3">
          <div className="text-sm font-semibold">Quick links</div>
          <Link to="/tasks" className="rounded-lg border border-black px-3 py-2 hover:shadow">
            Tasks Tracker
          </Link>
          <Link to="/board" className="rounded-lg border border-black px-3 py-2 hover:shadow">
            Kanban Projects
          </Link>
          <Link to="/library" className="rounded-lg border border-black px-3 py-2 hover:shadow">
            Material Library
          </Link>
          <Link to="/flash" className="rounded-lg border border-black px-3 py-2 hover:shadow">
            Flashcards
          </Link>

          <div className="mt-auto text-xs opacity-70">
            Tip: press <kbd className="px-1 border border-black rounded">Esc</kbd> to close.
          </div>
        </section>
      </div>

    </Modal>
  );
}
