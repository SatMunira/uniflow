import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { flashSetsMock } from "@/mocks/flashSet";
import { flashTermsMock, type FlashTerm } from "@/mocks/flashTerms";
import { FlashTermRow } from "@/components/flash/FlashTermRow";
import { timeAgo } from "@/lib/timeago";
import { Eye, EyeOff } from "lucide-react";
import { AddTermsPanel } from "@/components/flash/AddTermsPanel";
import { useNavigate } from "react-router-dom";


export default function FlashSetPage() {
    const { id = "" } = useParams<{ id: string }>();
    const set = flashSetsMock.find((s) => s.id === id);

    const [showDefs, setShowDefs] = React.useState(true);
    const [terms, setTerms] = React.useState<FlashTerm[]>(() =>
        flashTermsMock.filter((t) => t.setId === id)
    );
    const [isAdding, setIsAdding] = React.useState(false);
    const [front, setFront] = React.useState("");
    const [back, setBack] = React.useState("");
    const [addOpen, setAddOpen] = React.useState(false);
    const navigate = useNavigate();

    if (!set) {
        return (
            <Page>
                <PageHeader title="Flash set" />
                <div className="rounded-xl border p-6">
                    Set not found. <Link className="underline" to="/flash">← Back</Link>
                </div>
            </Page>
        );
    }

    function deleteTerm(termId: string) {
        setTerms((prev) => prev.filter((t) => t.id !== termId));
    }

    function addTermFromInputs() {
        const f = front.trim();
        const b = back.trim();
        if (!f || !b) return;
        const newT: FlashTerm = {
            id: crypto.randomUUID().slice(0, 8),
            setId: id,
            front: f,
            back: b,
        };
        setTerms((prev) => [...prev, newT]);
        setFront("");
        setBack("");
        setIsAdding(false);
    }

    return (
        <Page>
            <PageHeader
                title={set.title}
                subtitle={
                    <div className="text-sm text-black/60">
                        Created {timeAgo(set.createdAt)}
                    </div>
                }

            />

            {/* панель: слева счётчик, справа кнопки на одном уровне */}
            <div className="mb-3 flex items-center justify-between">
                <div className="font-mono text-[15px]">
                    Terms in this set ({terms.length})
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(`/flash/${set.id}/review`)}
                        className="rounded-full bg-[#ff007a] px-4 py-2 font-mono text-sm text-white hover:brightness-110"
                    >
                        Review ALL cards
                    </button>
                    <button
                        onClick={() => setShowDefs(v => !v)}
                        className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-3 py-2 text-xs font-mono hover:bg-black/5"
                    >
                        {showDefs ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        {showDefs ? "Hide definitions" : "Show definitions"}
                    </button>
                </div>
            </div>


            {/* Контейнер со светлым фоном, без классификаций */}
            <div className="rounded-2xl border border-black bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.07)]">
                <div className="space-y-3">
                    {terms.map((t) => (
                        <FlashTermRow
                            key={t.id}
                            term={t}
                            showBack={showDefs}
                            onDelete={deleteTerm}
                        />
                    ))}
                </div>

                {/* Add terms */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => setAddOpen(true)}
                        className="inline-flex items-center gap-2 rounded-full bg-[#a78bfa] px-6 py-3 font-mono text-white shadow-[0_6px_14px_rgba(0,0,0,0.12)] hover:brightness-105"
                    >
                        <span className="text-lg leading-none">✎</span>
                        Add terms
                    </button>
                </div>
            </div>
            <AddTermsPanel
                open={addOpen}
                onClose={() => setAddOpen(false)}
                onSave={(items) => {
                    setTerms((prev) => [
                        ...prev,
                        ...items.map((it) => ({
                            id: crypto.randomUUID().slice(0, 8),
                            setId: id,              // id текущего сета
                            front: it.front,
                            back: it.back,
                        })),
                    ]);
                }}
            />
        </Page>
    );
}
