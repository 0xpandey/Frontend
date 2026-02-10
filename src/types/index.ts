/**
 * Shared application types
 *
 * Author: Om Pandey
 * Used across store, components, and drag-and-drop logic
 */

export interface Question {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  url?: string;
  completed: boolean;
  notes?: string;
  order: number;
}

export interface SubTopic {
  id: string;
  name: string;
  questions: Question[];
  order: number;
}

export interface Topic {
  id: string;
  name: string;
  description?: string;
  subTopics: SubTopic[];
  order: number;
}

export interface Sheet {
  id: string;
  name: string;
  slug: string;
  description: string;
  topics: Topic[];
  stats: {
    totalQuestions: number;
    completedQuestions: number;
    easyQuestions: number;
    mediumQuestions: number;
    hardQuestions: number;
  };
}

export type DragItemType = "TOPIC" | "SUBTOPIC" | "QUESTION";

export interface DragItem {
  type: DragItemType;
  id: string;
  topicId?: string;
  subTopicId?: string;
  index: number;
}
