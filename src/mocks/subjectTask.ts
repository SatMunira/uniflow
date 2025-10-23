// data/subjectTasksMock.ts

import { Subject, Task } from "@/entities/subjectTasks";


export const subjectTasksMock: Subject[] = [
  new Subject(
    '1',
    'Wissenschaftliches Arbeiten',
    [
      new Task(
        '1-1',
        'Literaturrecherche abschließen',
        'Mindestens 10 wissenschaftliche Quellen zum Thema "Digitalisierung in der Bildung" finden und dokumentieren',
        '2025-10-25',
        false
      ),
      new Task(
        '1-2',
        'Exposé erstellen',
        'Exposé für die Hausarbeit mit Forschungsfrage, Zielsetzung und Gliederung verfassen (3-4 Seiten)',
        '2025-10-28',
        false
      ),
      new Task(
        '1-3',
        'Zitierregeln Quiz',
        'Online-Quiz zu APA und Harvard Zitierweisen abschließen',
        '2025-10-20',
        true
      ),
      new Task(
        '1-4',
        'Peer Review durchführen',
        'Exposé von zwei Kommilitonen lesen und konstruktives Feedback geben',
        '2025-11-01',
        false
      ),
      new Task(
        '1-5',
        'Einleitung schreiben',
        'Einleitung der Hausarbeit verfassen (ca. 2 Seiten)',
        '2025-11-05',
        false
      )
    ]
  ),

  new Subject(
    '2',
    'Diskrete Mathematik',
    [
      new Task(
        '2-1',
        'Übungsblatt 5',
        'Aufgaben zu Graphentheorie und Bäumen lösen (Aufgaben 1-6)',
        '2025-10-24',
        false
      ),
      new Task(
        '2-2',
        'Übungsblatt 4',
        'Kombinatorik Aufgaben bearbeiten',
        '2025-10-18',
        true
      ),
      new Task(
        '2-3',
        'Präsentation vorbereiten',
        'Gruppenreferat zu "Dijkstra Algorithmus" vorbereiten (15 Minuten)',
        '2025-10-30',
        false
      ),
      new Task(
        '2-4',
        'Probeklausur',
        'Probeklausur aus dem letzten Semester durcharbeiten',
        '2025-11-08',
        false
      ),
      new Task(
        '2-5',
        'Tutorium Vorbereitung',
        'Aufgaben für das Tutorium am Freitag vorbereiten',
        '2025-10-25',
        false
      ),
      new Task(
        '2-6',
        'Online Test',
        'Selbsttest zu Modularer Arithmetik',
        '2025-10-22',
        true
      )
    ]
  ),

  new Subject(
    '3',
    'Wirtschaftsinformatik',
    [
      new Task(
        '3-1',
        'ERP Fallstudie',
        'SAP Fallstudie bearbeiten und Prozessmodell erstellen',
        '2025-10-27',
        false
      ),
      new Task(
        '3-2',
        'BPMN Diagramm',
        'Geschäftsprozess der Uni-Bibliothek mit BPMN modellieren',
        '2025-10-26',
        false
      ),
      new Task(
        '3-3',
        'Kapitel 3 lesen',
        'Buchkapitel "Geschäftsprozessmanagement" lesen und zusammenfassen',
        '2025-10-19',
        true
      ),
      new Task(
        '3-4',
        'Gruppenprojekt Meeting',
        'Erstes Meeting für das Semesterprojekt "E-Commerce Plattform"',
        '2025-10-24',
        false
      )
    ]
  ),

  new Subject(
    '4',
    'EvA',
    [
      new Task(
        '4-1',
        'Use Case Diagramm',
        'Use Cases für die Mobile App identifizieren und dokumentieren',
        '2025-10-29',
        false
      ),
      new Task(
        '4-2',
        'Requirements Dokument',
        'Funktionale und nicht-funktionale Anforderungen spezifizieren',
        '2025-11-02',
        false
      ),
      new Task(
        '4-3',
        'Sprint Planning',
        'Backlog Items für Sprint 2 priorisieren',
        '2025-10-23',
        true
      ),
      new Task(
        '4-4',
        'Klassendiagramm erstellen',
        'UML Klassendiagramm für das Projektsystem entwickeln',
        '2025-11-06',
        false
      )
    ]
  ),

  new Subject(
    '5',
    'Mobile Entwicklung',
    [
      new Task(
        '5-1',
        'React Native Navigation',
        'Stack und Tab Navigation in der App implementieren',
        '2025-10-25',
        false
      ),
      new Task(
        '5-2',
        'API Integration',
        'REST API anbinden und Daten in der App anzeigen',
        '2025-10-28',
        false
      ),
      new Task(
        '5-3',
        'UI Design umsetzen',
        'Figma Designs für Home Screen und Profile Screen implementieren',
        '2025-10-21',
        true
      ),
      new Task(
        '5-4',
        'Testing',
        'Unit Tests für Authentication Service schreiben',
        '2025-11-01',
        false
      ),
      new Task(
        '5-5',
        'Code Review',
        'Pull Request von Teammitglied reviewen',
        '2025-10-24',
        false
      ),
      new Task(
        '5-6',
        'Performance Optimierung',
        'App Performance analysieren und FlatList optimieren',
        '2025-11-04',
        false
      ),
      new Task(
        '5-7',
        'Push Notifications',
        'Firebase Cloud Messaging integrieren',
        '2025-11-07',
        false
      )
    ]
  )
];

// Экспорт для удобного доступа
export const getAllTasks = (): Task[] => {
  return subjectTasksMock.flatMap(subject => subject.tasks);
};

export const getSubjectById = (id: string): Subject | undefined => {
  return subjectTasksMock.find(subject => subject.id === id);
};

export const getSubjectByName = (name: string): Subject | undefined => {
  return subjectTasksMock.find(subject => subject.name === name);
};

export const getSubjectBySlug = (slug: string): Subject | undefined => {
  return subjectTasksMock.find(subject => subject.slug === slug);
};