/**
 * Global sheet store using Zustand
 *
 * Author: Om Pandey
 */

import { create } from "zustand";
import { Sheet, Topic, SubTopic, Question } from "../types";
import { mockApi } from "../services/mockApi";

interface SheetState {
  sheet: Sheet | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  collapsedTopics: Set<string>;

  loadSheet: (slug: string) => Promise<void>;
  setSearchQuery: (value: string) => void;

  toggleTopicCollapse: (topicId: string) => void;
  toggleAllTopics: () => void;

  createTopic: (name: string, description?: string) => Promise<void>;
  updateTopic: (id: string, updates: Partial<Topic>) => Promise<void>;
  deleteTopic: (id: string) => Promise<void>;
  reorderTopics: (ids: string[]) => Promise<void>;

  createSubTopic: (topicId: string, name: string) => Promise<void>;
  updateSubTopic: (
    topicId: string,
    subTopicId: string,
    updates: Partial<SubTopic>
  ) => Promise<void>;
  deleteSubTopic: (topicId: string, subTopicId: string) => Promise<void>;
  reorderSubTopics: (topicId: string, ids: string[]) => Promise<void>;

  createQuestion: (
    topicId: string,
    subTopicId: string,
    data: Omit<Question, "id" | "order">
  ) => Promise<void>;
  updateQuestion: (
    topicId: string,
    subTopicId: string,
    questionId: string,
    updates: Partial<Question>
  ) => Promise<void>;
  deleteQuestion: (
    topicId: string,
    subTopicId: string,
    questionId: string
  ) => Promise<void>;
  toggleQuestionComplete: (
    topicId: string,
    subTopicId: string,
    questionId: string
  ) => Promise<void>;
  reorderQuestions: (
    topicId: string,
    subTopicId: string,
    ids: string[]
  ) => Promise<void>;
}

export const useSheetStore = create<SheetState>((set, get) => ({
  sheet: null,
  loading: false,
  error: null,
  searchQuery: "",
  collapsedTopics: new Set(),

  async loadSheet(slug) {
    set({ loading: true, error: null });
    try {
      const sheet = await mockApi.getSheet(slug);
      set({ sheet, loading: false });
    } catch {
      set({ error: "Unable to load sheet", loading: false });
    }
  },

  setSearchQuery(value) {
    set({ searchQuery: value });
  },

  toggleTopicCollapse(topicId) {
    const next = new Set(get().collapsedTopics);
    next.has(topicId) ? next.delete(topicId) : next.add(topicId);
    set({ collapsedTopics: next });
  },

  toggleAllTopics() {
    const { sheet, collapsedTopics } = get();
    if (!sheet) return;

    const next = new Set<string>();
    if (collapsedTopics.size !== sheet.topics.length) {
      sheet.topics.forEach((t) => next.add(t.id));
    }
    set({ collapsedTopics: next });
  },

  async createTopic(name, description) {
    try {
      const topic = await mockApi.createTopic(name, description);
      const sheet = get().sheet;
      if (sheet) {
        set({ sheet: { ...sheet, topics: [...sheet.topics, topic] } });
      }
    } catch {
      set({ error: "Failed to create topic" });
    }
  },

  async updateTopic(id, updates) {
    try {
      await mockApi.updateTopic(id, updates);
      const sheet = get().sheet;
      if (!sheet) return;

      set({
        sheet: {
          ...sheet,
          topics: sheet.topics.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        },
      });
    } catch {
      set({ error: "Failed to update topic" });
    }
  },

  async deleteTopic(id) {
    try {
      await mockApi.deleteTopic(id);
      const sheet = get().sheet;
      if (sheet) {
        set({ sheet: await mockApi.getSheet(sheet.slug) });
      }
    } catch {
      set({ error: "Failed to delete topic" });
    }
  },

  async reorderTopics(ids) {
    await mockApi.reorderTopics(ids);
    const sheet = get().sheet;
    if (!sheet) return;

    set({
      sheet: {
        ...sheet,
        topics: ids
          .map((id) => sheet.topics.find((t) => t.id === id))
          .filter(Boolean) as Topic[],
      },
    });
  },

  async createSubTopic(topicId, name) {
    const sub = await mockApi.createSubTopic(topicId, name);
    const sheet = get().sheet;
    if (!sheet) return;

    set({
      sheet: {
        ...sheet,
        topics: sheet.topics.map((t) =>
          t.id === topicId
            ? { ...t, subTopics: [...t.subTopics, sub] }
            : t
        ),
      },
    });
  },

  async updateSubTopic(topicId, subTopicId, updates) {
    await mockApi.updateSubTopic(topicId, subTopicId, updates);
    const sheet = get().sheet;
    if (!sheet) return;

    set({
      sheet: {
        ...sheet,
        topics: sheet.topics.map((t) =>
          t.id === topicId
            ? {
                ...t,
                subTopics: t.subTopics.map((s) =>
                  s.id === subTopicId ? { ...s, ...updates } : s
                ),
              }
            : t
        ),
      },
    });
  },

  async deleteSubTopic(topicId, subTopicId) {
    await mockApi.deleteSubTopic(topicId, subTopicId);
    const sheet = get().sheet;
    if (sheet) {
      set({ sheet: await mockApi.getSheet(sheet.slug) });
    }
  },

  async reorderSubTopics(topicId, ids) {
    await mockApi.reorderSubTopics(topicId, ids);
    const sheet = get().sheet;
    if (!sheet) return;

    set({
      sheet: {
        ...sheet,
        topics: sheet.topics.map((t) =>
          t.id === topicId
            ? {
                ...t,
                subTopics: ids
                  .map((id) => t.subTopics.find((s) => s.id === id))
                  .filter(Boolean) as SubTopic[],
              }
            : t
        ),
      },
    });
  },

  async createQuestion(topicId, subTopicId, data) {
    await mockApi.createQuestion(topicId, subTopicId, data);
    const sheet = get().sheet;
    if (sheet) {
      set({ sheet: await mockApi.getSheet(sheet.slug) });
    }
  },

  async updateQuestion(topicId, subTopicId, questionId, updates) {
    await mockApi.updateQuestion(topicId, subTopicId, questionId, updates);
    const sheet = get().sheet;
    if (!sheet) return;

    set({
      sheet: {
        ...sheet,
        topics: sheet.topics.map((t) =>
          t.id === topicId
            ? {
                ...t,
                subTopics: t.subTopics.map((s) =>
                  s.id === subTopicId
                    ? {
                        ...s,
                        questions: s.questions.map((q) =>
                          q.id === questionId ? { ...q, ...updates } : q
                        ),
                      }
                    : s
                ),
              }
            : t
        ),
      },
    });
  },

  async deleteQuestion(topicId, subTopicId, questionId) {
    await mockApi.deleteQuestion(topicId, subTopicId, questionId);
    const sheet = get().sheet;
    if (sheet) {
      set({ sheet: await mockApi.getSheet(sheet.slug) });
    }
  },

  async toggleQuestionComplete(topicId, subTopicId, questionId) {
    const sheet = get().sheet;
    if (!sheet) return;

    const question =
      sheet.topics
        .find((t) => t.id === topicId)
        ?.subTopics.find((s) => s.id === subTopicId)
        ?.questions.find((q) => q.id === questionId);

    if (!question) return;

    await get().updateQuestion(topicId, subTopicId, questionId, {
      completed: !question.completed,
    });

    set({ sheet: await mockApi.getSheet(sheet.slug) });
  },

  async reorderQuestions(topicId, subTopicId, ids) {
    await mockApi.reorderQuestions(topicId, subTopicId, ids);
    const sheet = get().sheet;
    if (!sheet) return;

    set({
      sheet: {
        ...sheet,
        topics: sheet.topics.map((t) =>
          t.id === topicId
            ? {
                ...t,
                subTopics: t.subTopics.map((s) =>
                  s.id === subTopicId
                    ? {
                        ...s,
                        questions: ids
                          .map((id) =>
                            s.questions.find((q) => q.id === id)
                          )
                          .filter(Boolean) as Question[],
                      }
                    : s
                ),
              }
            : t
        ),
      },
    });
  },
}));

/**
 * Derived filtered view of the sheet
 */
export const useFilteredSheet = () => {
  const sheet = useSheetStore((s) => s.sheet);
  const query = useSheetStore((s) => s.searchQuery.toLowerCase().trim());

  if (!sheet || !query) return sheet;

  return {
    ...sheet,
    topics: sheet.topics
      .map((t) => {
        const topicMatch =
          t.name.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query);

        const subTopics = t.subTopics
          .map((s) => {
            const questions = s.questions.filter(
              (q) =>
                q.title.toLowerCase().includes(query) ||
                q.notes?.toLowerCase().includes(query)
            );

            if (
              topicMatch ||
              s.name.toLowerCase().includes(query) ||
              questions.length
            ) {
              return {
                ...s,
                questions: topicMatch ? s.questions : questions,
              };
            }
            return null;
          })
          .filter(Boolean) as SubTopic[];

        if (topicMatch || subTopics.length) {
          return { ...t, subTopics: topicMatch ? t.subTopics : subTopics };
        }
        return null;
      })
      .filter(Boolean) as Topic[],
  };
};