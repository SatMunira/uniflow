import { getFlashcardsBySubjectId, type Flashcard } from "./flashcards";
import { getSubjects, type Subject } from "./subjects";

export interface SubjectWithFlashcards extends Subject {
  flashcards: Flashcard[];
}

/**
 * Получает все предметы и группирует их флеш-карты
 */
export const getSubjectsWithFlashcards = async (): Promise<SubjectWithFlashcards[]> => {
  // 1️⃣ Получаем все предметы
  const subjects = await getSubjects();

  // 2️⃣ Получаем флеш-карты для каждого предмета параллельно
  const subjectsWithFlashcards = await Promise.all(
    subjects.map(async (subject) => {
      const flashcards = await getFlashcardsBySubjectId(subject.id);
      return {
        ...subject,
        flashcards,
      } as SubjectWithFlashcards;
    })
  );

  return subjectsWithFlashcards;
};
