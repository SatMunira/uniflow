import * as React from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { PartyPopper } from "lucide-react";

type ResultState = {
    know: number;
    learning: number;
    total: number;
    title?: string;
};

export default function FlashReviewResultPage() {
    const { id = "" } = useParams<{ id: string }>();
    const nav = useNavigate();
    const { state } = useLocation();
    const { know = 0, learning = 0, total = 0, title = "Flashcards" } =
        (state as ResultState) ?? {};

    return (
        <div className="min-h-[calc(100vh-2rem)] bg-[#FDFCED]">
            <div className="mx-auto max-w-6xl px-6 py-8">
                <div className="font-mono text-xl text-black/85 mb-6">{title}</div>

                <div className="flex items-start justify-between gap-8">
                    <div>
                        <h1 className="font-mono text-[42px] leading-tight">
                            Amazing!
                        </h1>
                        <p className="font-mono text-[34px]">Keep doing the good work!</p>
                    </div>

                    <div className="shrink-0 pt-2">
                        <PartyPopper
                            className="text-[#ff007a]"
                            size={86}         
                            strokeWidth={2.2}
                        />
                    </div>
                </div>

                <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div>
                        <div className="font-mono text-[22px] text-black/80 mb-6">
                            How you’re doing:
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="grid place-items-center rounded-full bg-emerald-300/70 text-emerald-900 border-2 border-emerald-400/70 shadow-sm w-[116px] h-[116px]">
                                <span className="text-[64px] leading-none">✓</span>
                            </div>


                            <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between rounded-2xl bg-emerald-100/70 px-5 py-3 shadow-sm">
                                    <span className="font-mono text-emerald-800">Know</span>
                                    <span className="font-mono text-emerald-800">{know}</span>
                                </div>

                                <div className="flex items-center justify-between rounded-2xl bg-orange-100/70 px-5 py-3 shadow-sm">
                                    <span className="font-mono text-orange-700">Still learning</span>
                                    <span className="font-mono text-orange-700">{learning}</span>
                                </div>

                                {/* Terms left */}
                                <div className="flex items-center justify-between rounded-2xl bg-[#E7EAF1] px-5 py-3 shadow-sm">
                                    <span className="font-mono text-slate-700">Terms left</span>
                                    <span className="font-mono text-slate-700">
                                        {Math.max(total - know - learning, 0)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Правая колонка */}
                    <div>
                        <div className="font-mono text-[22px] text-black/80 mb-6">
                            Next steps:
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={() => nav(`/flash/${id}/review`)}
                                className="w-full rounded-2xl bg-[#ff007a] px-6 py-4 text-white font-mono text-lg shadow hover:brightness-110"
                            >
                                Restart Flashcards
                            </button>

                            <Link
                                to={`/flash/${id}`}
                                className="block w-full rounded-2xl bg-[#F0F1F7] px-6 py-4 text-center font-mono text-lg text-black/80 shadow hover:bg-[#EBEDF5]"
                            >
                                Back to the menu
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
