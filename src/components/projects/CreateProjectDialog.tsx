import * as React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AccentButton } from '@/components/ui/AccentButton/AccentButton'
import type { Project } from '@/entities/projects';


export function CreateProjectDialog({ onCreate }: { onCreate: (p: Project) => void }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");


  function submit() {
    if (!title.trim()) return;
    const id = crypto.randomUUID();
    const project: Project = {
      id,
      title: title.trim(),
      members: [],
      extraCount: 0,
      gradient: "from-purple-400 to-violet-600",
    };
    onCreate(project);
    setTitle("");
    setOpen(false);
  }


  return (
    
    <Dialog open={open} onOpenChange={(v: boolean) => setOpen(v)}>
      {/* Передаём onOpenChange в триггер (обёртка для явного типа) */}
      <DialogTrigger asChild onOpenChange={(v: boolean) => setOpen(v)}>
        <AccentButton className="fixed bottom-8 right-8 rounded-full size-14 text-2xl shadow-lg">+</AccentButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neues Projekt</DialogTitle>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="p-title">Titel</Label>
          <Input id="p-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project name" />
        </div>

        <DialogFooter>
          {/* Исправлены закрывающие теги */}
          <AccentButton variant="outline" onClick={() => setOpen(false)}>Abbrechen</AccentButton>
          <AccentButton onClick={submit}>Erstellen</AccentButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}