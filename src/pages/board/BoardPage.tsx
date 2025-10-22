import { Page, PageSection } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { KanbanSquare } from "lucide-react";

export default function BoardPage() {
  return (
    <Page>
      <PageHeader title="Projects" subtitle="Kanban, Calendar, Table" />
      <PageSection>
        <EmptyState
          title="Пока нет проектов"
          description="Создай первую доску, или импортируй задачи из CSV."
          icon={<KanbanSquare className="size-10 opacity-70" />}
        />
      </PageSection>
    </Page>
  );
}
