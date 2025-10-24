export type FlashTerm = {
  id: string;
  setId: string;
  front: string;     
  back: string;    
};

export const flashTermsMock: FlashTerm[] = [
  {
    id: "t1",
    setId: "f1",
    front:
      "Immer wieder liest man in der Zeitung, dass Extremsportler im Gebirge verunglücken: Sie stürzen ab, sie sind verletzt, sie erfrieren",
    back:
      "Снова и снова вы читаете в газетах о том, что экстремальные спортсмены попадают в несчастные случаи в горах: они падают, получают травмы, замерзают",
  },
  {
    id: "t2",
    setId: "f1",
    front: "Am Rande des Waldes stand ein altes Haus.",
    back: "На краю леса стоял старый дом.",
  },
  {
    id: "t3",
    setId: "f1",
    front: "Er vergisst allmählich, wer er war und was passiert ist",
    back: "Он постепенно забывает, кем он был и что произошло.",
  },

  { id: "t4", setId: "f2", front: "Beispiel 1", back: "Пример 1" },
  { id: "t5", setId: "f2", front: "Beispiel 2", back: "Пример 2" },
];
