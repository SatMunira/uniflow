import { Folder, MaterialItem, Tag } from "@/entities/library";

export const libFoldersMock: Folder[] = [
    new Folder(
      "Wissenschaftliches Arbeiten",
      [
        new MaterialItem(
          "Einführung_Wissenschaftliches_Arbeiten.pdf",
          "2024-10-15",
          new Tag("Vorlesung", "#3B82F6")
        ),
        new MaterialItem(
          "Zitierregeln_Leitfaden.pdf",
          "2024-10-18",
          new Tag("Wichtig", "#EF4444")
        ),
        new MaterialItem(
          "Hausarbeit_Template.docx",
          "2024-10-20",
          new Tag("Template", "#10B981")
        )
      ]
    ),
    new Folder(
      "Diskrete Mathematik",
      [
        new MaterialItem(
          "Graphentheorie_Skript.pdf",
          "2024-09-25",
          new Tag("Skript", "#8B5CF6")
        ),
        new MaterialItem(
          "Übungsblatt_01.pdf",
          "2024-10-01",
          new Tag("Übung", "#F59E0B")
        ),
        new MaterialItem(
          "Klausurvorbereitung.xlsx",
          "2024-10-22",
          new Tag("Prüfung", "#EF4444")
        )
      ]
    ),
    new Folder(
      "Wirtschaftsinformatik",
      [
        new MaterialItem(
          "ERP_Systeme_Übersicht.pptx",
          "2024-10-10",
          new Tag("Präsentation", "#EC4899")
        ),
        new MaterialItem(
          "Geschäftsprozesse_Modellierung.pdf",
          "2024-10-12",
          new Tag("Theorie", "#3B82F6")
        ),
        new MaterialItem(
          "SAP_Tutorial.mp4",
          "2024-10-19",
          new Tag("Video", "#14B8A6")
        )
      ]
    ),
    new Folder(
      "EvA",
      [
        new MaterialItem(
          "Requirements_Engineering.pdf",
          "2024-10-05",
          new Tag("Vorlesung", "#3B82F6")
        ),
        new MaterialItem(
          "Projektplan_Vorlage.xlsx",
          "2024-10-08",
          new Tag("Template", "#10B981")
        ),
        new MaterialItem(
          "UML_Diagramme_Beispiele.pdf",
          "2024-10-14",
          new Tag("Beispiel", "#F59E0B")
        )
      ]
    ),
    new Folder(
      "Mobile Entwicklung",
      [
        new MaterialItem(
          "React_Native_Grundlagen.pdf",
          "2024-10-21",
          new Tag("Tutorial", "#06B6D4")
        ),
        new MaterialItem(
          "App_Design_Guidelines.sketch",
          "2024-10-16",
          new Tag("Design", "#EC4899")
        ),
        new MaterialItem(
          "API_Integration_Code.zip",
          "2024-10-23",
          new Tag("Code", "#8B5CF6")
        ),
        new MaterialItem(
          "Performance_Optimization.md",
          "2024-10-11",
          new Tag("Doku", "#64748B")
        )
      ]
    ),
  ];