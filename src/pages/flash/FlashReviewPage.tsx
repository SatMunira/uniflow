import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { flashTermsMock } from "@/mocks/flashTerms";
import { flashSetsMock } from "@/mocks/flashSet";
import { ThumbsDown, ThumbsUp } from "lucide-react";

// простая перемешалка
function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashReviewPage() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const set = flashSetsMock.find((s) => s.id === id);

  const allTerms = React.useMemo(
    () => flashTermsMock.filter((t) => t.setId === id),
    [id]
  );

  // очередь карт
  const [queue, setQueue] = React.useState(() => shuffle(allTerms));
  const [idx, setIdx] = React.useState(0);              // номер текущей карты
  const [flipped, setFlipped] = React.useState(false);  // показана задняя сторона?
  const [know, setKnow] = React.useState(0);
  const [learning, setLearning] = React.useState(() => queue.length);

  const total = queue.length;
  const current = queue[idx];

  React.useEffect(() => {
    if (total === 0) navigate(`/flash/${id}`);
  }, [total, id, navigate]);

  function nextCard(correct: boolean) {
    // возвр. карточку в хвост если "не знаю"
    setFlipped(false);

    if (correct) {
      setKnow((k) => k + 1);
      setLearning((l) => Math.max(0, l - 1));
    } else {
      // вставляем в случайное место хвоста
      const rest = queue.slice(idx + 1);
      const head = queue.slice(0, idx);
      const keep = queue[idx];
      const insertPos = Math.floor(Math.random() * (rest.length + 1));
      const newQueue = [...head, ...rest];
      newQueue.splice(idx + insertPos, 0, keep);
      setQueue(newQueue);
    }

    if (idx + 1 >= queue.length) {
      // закончили
      setTimeout(() => navigate(`/flash/${id}`), 450);
    } else {
      setIdx((i) => i + 1);
    }
  }

  const progress = total ? Math.round(((idx + (flipped ? 0.5 : 0)) / total) * 100) : 0;

  if (!set || !current) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#bba9ea]">
        <div className="rounded-xl bg-white/90 px-6 py-4 font-mono">
          Set not found
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#bba9ea]">
      {/* верхняя панель с прогрессом */}
      <div className="mx-auto max-w-5xl px-6 pt-5">
        <div className="flex items-center gap-4">
          <div className="relative h-4 w-full overflow-hidden rounded-full border border-black/30 bg-white/60">
            <div
              className="h-full bg-[#ff007a]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="font-mono text-black/80">{progress}%</div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-orange-700/70 bg-[#f3d2a6]/40 px-4 py-1.5 font-mono text-orange-700">
            <span className="inline-flex size-7 items-center justify-center rounded-full border border-orange-700/40">
              {learning}
            </span>
            Still learning
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-600/70 bg-emerald-200/40 px-4 py-1.5 font-mono text-emerald-700">
            <span className="inline-flex size-7 items-center justify-center rounded-full border border-emerald-700/40">
              {know}
            </span>
            Know
          </div>
        </div>
      </div>

      {/* стопка карт */}
      <div className="mx-auto mt-10 max-w-4xl px-6">
        <CardStack
          index={idx + 1}
          total={total}
          front={current.front}
          back={current.back}
          flipped={flipped}
          onFlip={() => setFlipped((v) => !v)}
        />
      </div>

      {/* кнопки оценок */}
      <div className="mx-auto mt-10 flex max-w-3xl items-center justify-center gap-24 pb-16">
        <button
          onClick={() => nextCard(false)}
          className="size-20 rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.25)] border-2 border-black/40 grid place-items-center hover:scale-[1.03] transition-transform"
          aria-label="I don't know"
        >
          <ThumbsDown className="h-9 w-9 text-rose-600" strokeWidth={2.2} />
        </button>

        <button
          onClick={() => nextCard(true)}
          className="size-20 rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.25)] border-2 border-black/40 grid place-items-center hover:scale-[1.03] transition-transform"
          aria-label="I know"
        >
          <ThumbsUp className="h-9 w-9 text-emerald-600" strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}

/** Карточка со стопкой + flip */
function CardStack({
  index,
  total,
  front,
  back,
  flipped,
  onFlip,
}: {
  index: number;
  total: number;
  front: string;
  back: string;
  flipped: boolean;
  onFlip: () => void;
}) {
  return (
    <div className="relative h-[460px]">
      {/* подложки для вида стопки */}
      <div className="absolute inset-x-6 top-10 rounded-xl border-2 border-black/30 bg-white/75 shadow-[0_12px_30px_rgba(0,0,0,0.25)] rotate-[-4deg]" />
      <div className="absolute inset-x-3 top-6 rounded-xl border-2 border-black/30 bg-white/85 shadow-[0_12px_30px_rgba(0,0,0,0.25)] rotate-[2deg]" />

      {/* активная карта */}
      <div
        className={`
          relative z-10 mx-auto h-full w-full rounded-xl border-2 border-black/40 bg-white
          shadow-[0_16px_38px_rgba(0,0,0,0.28)]
          [transform-style:preserve-3d] transition-transform duration-300
          ${flipped ? "[transform:rotateY(180deg)]" : ""}
        `}
      >
        {/* верхняя полоса (розовая) */}
        <div className="absolute inset-x-0 top-0 h-24 rounded-t-[11px] bg-pink-200/70 border-b-2 border-black/30">
          {/* ленточка с номером */}
          <div className="absolute left-0 top-0 h-24 w-28 bg-[#ff007a] rounded-tl-[11px] rounded-br-[24px] grid place-items-center text-white font-mono text-4xl border-r-2 border-b-2 border-black/30">
            {index}
          </div>
          {/* "Question" */}
          <div className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full bg-white/70 px-5 py-2 font-mono text-black">
            Question
          </div>
          {/* Flip */}
          <button
            onClick={onFlip}
            className="absolute right-4 top-5 rounded-full bg-white/80 px-5 py-2 font-mono border border-black/20 hover:bg-white"
          >
            {flipped ? "Back" : "Flip"}
          </button>
        </div>

        {/* FRONT */}
        <div className="absolute inset-0 grid place-items-center backface-hidden px-10 pt-24">
          <div className="font-mono text-4xl text-center leading-snug">
            {front}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-sm text-black/50">
            {index} / {total}
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 grid place-items-center px-10 pt-24 [transform:rotateY(180deg)] backface-hidden">
          <div className="font-mono text-3xl text-center leading-snug">
            {back}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-sm text-black/50">
            {index} / {total}
          </div>
        </div>
      </div>
    </div>
  );
}
