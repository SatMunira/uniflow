import type { Project } from '@/entities/projects'
const projectsMock: Project[] = [
    {
        id: "p1",
        title: "Project in der Softwareentwicklung",
        members: [
            { id: "m1", name: "Anna Müller", initials: "AM" },
            { id: "m2", name: "Ben Koch", initials: "BK" },
            { id: "m3", name: "Chen Li", initials: "CL" },
            { id: "m4", name: "Daria Ivanova", initials: "DI" },
            { id: "m5", name: "Eren Kaya", initials: "EK" },
        ],
        extraCount: 5,
        gradient: "from-purple-400 to-violet-600",
    },
    {
        id: "p2",
        title: "JavaFx Chat App",
        members: [
            { id: "m6", name: "Fox Lee", initials: "FL" },
            { id: "m7", name: "Gina Park", initials: "GP" },
            { id: "m8", name: "Hui Zhang", initials: "HZ" },
            { id: "m9", name: "Ivan Petrov", initials: "IP" },
            { id: "m10", name: "João Silva", initials: "JS" },
        ],
        extraCount: 5,
        gradient: "from-violet-400 to-fuchsia-600",
    },
    {
        id: "p3",
        title: "Zuvi",
        members: [
            { id: "m11", name: "Karl", initials: "K" },
            { id: "m12", name: "Lena", initials: "L" },
            { id: "m13", name: "Mina", initials: "M" },
            { id: "m14", name: "Nils", initials: "N" },
            { id: "m15", name: "Omar", initials: "O" },
        ],
        extraCount: 5,
        gradient: "from-purple-500 to-violet-700",
    },
];

export default projectsMock;