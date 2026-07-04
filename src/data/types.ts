export interface ChapterExample {
  title: string;
  explanation: string;
  code: string;
}

export interface ChapterExercise {
  instructions: string;
  starterCode: string;
  hint: string;
}

export interface QuizItem {
  question: string;
  type: 'mc' | 'predict';
  options: string[];
  correctIndex: number;
  explanation: string;
  code?: string;
}

export interface Chapter {
  id: string;
  number: number;
  level: 'Basics' | 'Intermediate';
  levelNum: number;
  title: string;
  intro: string;
  examples: ChapterExample[];
  exercise: ChapterExercise;
  quiz: QuizItem[];
}
