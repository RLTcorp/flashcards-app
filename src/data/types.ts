export interface Question {
  question: string;
  reponse: string;
}

export interface Chapter {
  id: number;
  titre: string;
  questions: Question[];
}

export interface ExamData {
  chapitres: Chapter[];
}
