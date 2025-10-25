import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { type Flashcard, getFlashcardsBySubjectId } from "@/api/flashcards";

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

  const [flashcards, setFlashcards] = React.useState<Flashcard[]>([]);

  React.useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const data = await getFlashcardsBySubjectId(id);
        setFlashcards(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFlashcards();
  }, [id]);

  const navigate = useNavigate();

  // очередь карт
  const [queue, setQueue] = React.useState<Flashcard[]>([]);
  const [idx, setIdx] = React.useState(0); // номер текущей карты
  React.useEffect(() => {
    if (flashcards.length > 0) {
      setQueue(shuffle(flashcards));
      setIdx(0);
    }
  }, [flashcards]);
  const [flipped, setFlipped] = React.useState(false); // показана задняя сторона?
  const [know, setKnow] = React.useState(0);
  const [learning, setLearning] = React.useState(() => queue.length);

  const current = queue[idx];

  console.log(current);

  function nextCard(correct: boolean) {
    if (!current) return;
    setFlipped(false);

    setQueue((prevQueue) => {
      const cur = prevQueue[idx];

      if (correct && cur) {
        setKnownIds((prev) => {
          const next = new Set(prev);
          next.add(cur.id);
          return next;
        });
      }

      if (!correct && cur) {
        const head = prevQueue.slice(0, idx);
        const rest = prevQueue.slice(idx + 1);
        const insertPos = Math.floor(Math.random() * (rest.length + 1));
        const newQueue = [...head, ...rest];
        newQueue.splice(idx + insertPos, 0, cur);
        return newQueue;
      }
      return prevQueue;
    });

    setIdx((i) => i + 1);
  }

  React.useEffect(() => {
    if (idx < queue.length) return;

    if (knownIds.size === total) {
      navigate(`/flash/${id}/results`, {
        state: { know: knownIds.size, still: 0, total },
        replace: true,
      });
      return;
    }
    const left = allTerms.filter((t) => !knownIds.has(t.id));
    setQueue(shuffle(left));
    setIdx(0);
  }, [idx, queue.length, knownIds, total, allTerms, id, navigate]);

  const progress = total
    ? Math.round(((idx + (flipped ? 0.5 : 0)) / total) * 100)
    : 0;

  if (!flashcards) {
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
      <div className="mx-auto max-w-5xl px-6 pt-5">
        <div className="flex items-center gap-4">
          <div className="relative h-4 w-full overflow-hidden rounded-full border border-black/30 bg-white/60">
            <div className="h-full bg-[#ff007a]" style={{ width: `${progress}%` }} />
          </div>
          <div className="font-mono text-black/80">{progress}%</div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-16 items-center justify-center rounded-full border-2 border-orange-700/70 bg-[#f6e0c9] font-mono text-lg text-orange-700">
              {learning}
            </span>
            <span className="font-mono text-xl text-orange-700">Still learning</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-16 items-center justify-center rounded-full border-2 border-emerald-600/70 bg-emerald-100 font-mono text-lg text-emerald-700">
              {know}
            </span>
            <span className="font-mono text-xl text-emerald-700">Know</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-4xl px-6">
        <CardStack
          index={idx}
          total={total}
          front={current.question}
          back={current.answer}
          flipped={flipped}
          onFlip={() => setFlipped((v) => !v)}
        />
      </div>

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
    <div className="relative h-[460px] perspective-[1200px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -rotate-[3deg] translate-x-6 translate-y-6 rounded-[22px] border-2 border-black/25 bg-white shadow-[0_22px_60px_rgba(0,0,0,0.28)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rotate-[2deg] translate-x-3 translate-y-3 rounded-[22px] border-2 border-black/25 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.24)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -rotate-[0.8deg] translate-x-1.5 translate-y-1.5 rounded-[22px] border-2 border-black/25 bg-white shadow-[0_14px_40px_rgba(0,0,0,0.20)]"
      />

      <div className="relative z-10 mx-auto h-full w-full rounded-xl border-2 border-black/40 bg-white shadow-[0_16px_38px_rgba(0,0,0,0.28)] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-24 rounded-t-[14px] bg-[#FCBED2] border-b-2 border-black/30">
        
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="180"
            height="150"
            viewBox="0 0 198 200"
            fill="none"
            className="absolute left-0 top-0 pointer-events-none"
          >
            <rect x="25" width="148" height="148" fill="#FF017E" />
            <path d="M99 146.5L24.75 191.966L24.75 101.034L99 146.5Z" fill="#FF017E" />
            <path d="M97 147.5L172.75 192.966V102.034L97 147.5Z" fill="#FF017E" />
          </svg>

    
          <span
            className="
              absolute left-0 top-0 w-[180px] h-[100px]
              grid place-items-center
              font-mono text-white text-[56px] font-bold leading-none
              pointer-events-none
            "
          >
            {index}
          </span>

    
          <div className="absolute left-40 top-5 rounded-full bg-white/80 px-5 py-2 font-mono text-[#FF017E] border border-black/20">
            Question
          </div>

          <button
            onClick={onFlip}
            className="absolute right-4 top-5 rounded-full bg-white/80 px-5 py-2 font-mono text-[#FF017E] border border-black/20 hover:bg-white"
          >
            {flipped ? "Back" : "Flip"}
          </button>
        </div>

        <div className="absolute inset-x-0 top-24 bottom-0 px-10">
          <div
            className={`
              relative h-full
              [transform-style:preserve-3d]
              transition-transform duration-300
              [will-change:transform]
              ${flipped ? "[transform:rotateY(180deg)]" : ""}
            `}
          >
        
            <div className="absolute inset-0 grid place-items-center [backface-visibility:hidden]">
              <div className="font-mono text-4xl text-center leading-snug">
                {front}
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-sm text-black/50">
                {index} / {total}
              </div>
            </div>

            <div className="absolute inset-0 grid place-items-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className="font-mono text-3xl text-center leading-snug">
                {back}
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-sm text-black/50">
                {index} / {total}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
