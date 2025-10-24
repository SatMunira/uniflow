import * as React from "react";
import { Page } from "@/components/layout/Page";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageSection } from "@/components/layout/PageSection";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CreateProjectDialog } from "@/components/projects/CreateProjectDialog";
import projectsMock from "@/mocks/projects";
import { useNavigate } from "react-router-dom";

export default function ProjectsPage() {
  const navigate = useNavigate();

  return (
    <Page>
      <PageHeader title="Projects" />
      <PageSection>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projectsMock.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onClick={() => navigate(`/projects/${p.id}`)} 
            />
          ))}
        </div>
      </PageSection>
      <CreateProjectDialog onCreate={() => {}} />
    </Page>
  );
}
