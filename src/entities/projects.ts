export type ProjectMember = {
    id: string;
    name: string;
    initials: string;
};


export type Project = {
    id: string;
    title: string;
    members: ProjectMember[];
    extraCount?: number;
    gradient?: string;
};