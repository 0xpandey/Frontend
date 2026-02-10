import { Sheet, Topic, SubTopic, Question } from '../types';

// Mock data inspired by Striver SDE Sheet structure
const mockSheetData: Sheet = {
  id: '1',
  name: 'DSA Mastery Sheet',
  slug: 'dsa-mastery-sheet',
  description: 'A comprehensive collection of Data Structures and Algorithms problems to master coding interviews',
  topics: [
    {
      id: 'topic-1',
      name: 'Arrays',
      description: 'Master array manipulation and traversal techniques',
      order: 0,
      subTopics: [
        {
          id: 'subtopic-1-1',
          name: 'Easy Problems',
          order: 0,
          questions: [
            {
              id: 'q-1-1-1',
              title: 'Two Sum',
              difficulty: 'Easy',
              url: 'https://leetcode.com/problems/two-sum/',
              completed: true,
              order: 0,
            },
            {
              id: 'q-1-1-2',
              title: 'Best Time to Buy and Sell Stock',
              difficulty: 'Easy',
              url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
              completed: true,
              order: 1,
            },
            {
              id: 'q-1-1-3',
              title: 'Remove Duplicates from Sorted Array',
              difficulty: 'Easy',
              url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
              completed: false,
              order: 2,
            },
          ],
        },
        {
          id: 'subtopic-1-2',
          name: 'Medium Problems',
          order: 1,
          questions: [
            {
              id: 'q-1-2-1',
              title: 'Container With Most Water',
              difficulty: 'Medium',
              url: 'https://leetcode.com/problems/container-with-most-water/',
              completed: false,
              order: 0,
            },
            {
              id: 'q-1-2-2',
              title: 'Product of Array Except Self',
              difficulty: 'Medium',
              url: 'https://leetcode.com/problems/product-of-array-except-self/',
              completed: true,
              order: 1,
            },
          ],
        },
      ],
    },
    {
      id: 'topic-2',
      name: 'Linked Lists',
      description: 'Learn to manipulate linked list nodes and pointers',
      order: 1,
      subTopics: [
        {
          id: 'subtopic-2-1',
          name: 'Basic Operations',
          order: 0,
          questions: [
            {
              id: 'q-2-1-1',
              title: 'Reverse Linked List',
              difficulty: 'Easy',
              url: 'https://leetcode.com/problems/reverse-linked-list/',
              completed: false,
              order: 0,
            },
            {
              id: 'q-2-1-2',
              title: 'Merge Two Sorted Lists',
              difficulty: 'Easy',
              url: 'https://leetcode.com/problems/merge-two-sorted-lists/',
              completed: false,
              order: 1,
            },
          ],
        },
        {
          id: 'subtopic-2-2',
          name: 'Advanced Problems',
          order: 1,
          questions: [
            {
              id: 'q-2-2-1',
              title: 'Linked List Cycle II',
              difficulty: 'Medium',
              url: 'https://leetcode.com/problems/linked-list-cycle-ii/',
              completed: false,
              order: 0,
            },
            {
              id: 'q-2-2-2',
              title: 'Copy List with Random Pointer',
              difficulty: 'Medium',
              url: 'https://leetcode.com/problems/copy-list-with-random-pointer/',
              completed: false,
              order: 1,
            },
          ],
        },
      ],
    },
    {
      id: 'topic-3',
      name: 'Trees',
      description: 'Binary trees, BST, and tree traversal algorithms',
      order: 2,
      subTopics: [
        {
          id: 'subtopic-3-1',
          name: 'Tree Traversal',
          order: 0,
          questions: [
            {
              id: 'q-3-1-1',
              title: 'Binary Tree Inorder Traversal',
              difficulty: 'Easy',
              url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
              completed: true,
              order: 0,
            },
            {
              id: 'q-3-1-2',
              title: 'Level Order Traversal',
              difficulty: 'Medium',
              url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
              completed: false,
              order: 1,
            },
          ],
        },
      ],
    },
    {
      id: 'topic-4',
      name: 'Dynamic Programming',
      description: 'Optimization problems using memoization and tabulation',
      order: 3,
      subTopics: [
        {
          id: 'subtopic-4-1',
          name: '1D DP',
          order: 0,
          questions: [
            {
              id: 'q-4-1-1',
              title: 'Climbing Stairs',
              difficulty: 'Easy',
              url: 'https://leetcode.com/problems/climbing-stairs/',
              completed: false,
              order: 0,
            },
            {
              id: 'q-4-1-2',
              title: 'House Robber',
              difficulty: 'Medium',
              url: 'https://leetcode.com/problems/house-robber/',
              completed: false,
              order: 1,
            },
          ],
        },
        {
          id: 'subtopic-4-2',
          name: '2D DP',
          order: 1,
          questions: [
            {
              id: 'q-4-2-1',
              title: 'Unique Paths',
              difficulty: 'Medium',
              url: 'https://leetcode.com/problems/unique-paths/',
              completed: false,
              order: 0,
            },
            {
              id: 'q-4-2-2',
              title: 'Longest Common Subsequence',
              difficulty: 'Medium',
              url: 'https://leetcode.com/problems/longest-common-subsequence/',
              completed: false,
              order: 1,
            },
            {
              id: 'q-4-2-3',
              title: 'Edit Distance',
              difficulty: 'Hard',
              url: 'https://leetcode.com/problems/edit-distance/',
              completed: false,
              order: 2,
            },
          ],
        },
      ],
    },
  ],
  stats: {
    totalQuestions: 0,
    completedQuestions: 0,
    easyQuestions: 0,
    mediumQuestions: 0,
    hardQuestions: 0,
  },
};

// Calculate stats
const calculateStats = (sheet: Sheet) => {
  let total = 0;
  let completed = 0;
  let easy = 0;
  let medium = 0;
  let hard = 0;

  sheet.topics.forEach(topic => {
    topic.subTopics.forEach(subTopic => {
      subTopic.questions.forEach(question => {
        total++;
        if (question.completed) completed++;
        if (question.difficulty === 'Easy') easy++;
        if (question.difficulty === 'Medium') medium++;
        if (question.difficulty === 'Hard') hard++;
      });
    });
  });

  sheet.stats = {
    totalQuestions: total,
    completedQuestions: completed,
    easyQuestions: easy,
    mediumQuestions: medium,
    hardQuestions: hard,
  };
};

calculateStats(mockSheetData);

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async getSheet(slug: string): Promise<Sheet> {
    await delay(500);
    return JSON.parse(JSON.stringify(mockSheetData));
  },

  async updateQuestion(
    topicId: string,
    subTopicId: string,
    questionId: string,
    updates: Partial<Question>
  ): Promise<Question> {
    await delay(300);
    const topic = mockSheetData.topics.find(t => t.id === topicId);
    const subTopic = topic?.subTopics.find(st => st.id === subTopicId);
    const question = subTopic?.questions.find(q => q.id === questionId);
    if (question) {
      Object.assign(question, updates);
      calculateStats(mockSheetData);
    }
    return question!;
  },

  async createTopic(name: string, description?: string): Promise<Topic> {
    await delay(300);
    const newTopic: Topic = {
      id: `topic-${Date.now()}`,
      name,
      description,
      subTopics: [],
      order: mockSheetData.topics.length,
    };
    mockSheetData.topics.push(newTopic);
    return newTopic;
  },

  async updateTopic(topicId: string, updates: Partial<Topic>): Promise<Topic> {
    await delay(300);
    const topic = mockSheetData.topics.find(t => t.id === topicId);
    if (topic) {
      Object.assign(topic, updates);
    }
    return topic!;
  },

  async deleteTopic(topicId: string): Promise<void> {
    await delay(300);
    const index = mockSheetData.topics.findIndex(t => t.id === topicId);
    if (index !== -1) {
      mockSheetData.topics.splice(index, 1);
      calculateStats(mockSheetData);
    }
  },

  async createSubTopic(topicId: string, name: string): Promise<SubTopic> {
    await delay(300);
    const topic = mockSheetData.topics.find(t => t.id === topicId);
    if (!topic) throw new Error('Topic not found');
    
    const newSubTopic: SubTopic = {
      id: `subtopic-${Date.now()}`,
      name,
      questions: [],
      order: topic.subTopics.length,
    };
    topic.subTopics.push(newSubTopic);
    return newSubTopic;
  },

  async updateSubTopic(
    topicId: string,
    subTopicId: string,
    updates: Partial<SubTopic>
  ): Promise<SubTopic> {
    await delay(300);
    const topic = mockSheetData.topics.find(t => t.id === topicId);
    const subTopic = topic?.subTopics.find(st => st.id === subTopicId);
    if (subTopic) {
      Object.assign(subTopic, updates);
    }
    return subTopic!;
  },

  async deleteSubTopic(topicId: string, subTopicId: string): Promise<void> {
    await delay(300);
    const topic = mockSheetData.topics.find(t => t.id === topicId);
    if (topic) {
      const index = topic.subTopics.findIndex(st => st.id === subTopicId);
      if (index !== -1) {
        topic.subTopics.splice(index, 1);
        calculateStats(mockSheetData);
      }
    }
  },

  async createQuestion(
    topicId: string,
    subTopicId: string,
    question: Omit<Question, 'id' | 'order'>
  ): Promise<Question> {
    await delay(300);
    const topic = mockSheetData.topics.find(t => t.id === topicId);
    const subTopic = topic?.subTopics.find(st => st.id === subTopicId);
    if (!subTopic) throw new Error('SubTopic not found');

    const newQuestion: Question = {
      ...question,
      id: `q-${Date.now()}`,
      order: subTopic.questions.length,
    };
    subTopic.questions.push(newQuestion);
    calculateStats(mockSheetData);
    return newQuestion;
  },

  async deleteQuestion(
    topicId: string,
    subTopicId: string,
    questionId: string
  ): Promise<void> {
    await delay(300);
    const topic = mockSheetData.topics.find(t => t.id === topicId);
    const subTopic = topic?.subTopics.find(st => st.id === subTopicId);
    if (subTopic) {
      const index = subTopic.questions.findIndex(q => q.id === questionId);
      if (index !== -1) {
        subTopic.questions.splice(index, 1);
        calculateStats(mockSheetData);
      }
    }
  },

  async reorderTopics(topicIds: string[]): Promise<void> {
    await delay(300);
    const reorderedTopics = topicIds
      .map(id => mockSheetData.topics.find(t => t.id === id))
      .filter(Boolean) as Topic[];
    
    reorderedTopics.forEach((topic, index) => {
      topic.order = index;
    });
    
    mockSheetData.topics = reorderedTopics;
  },

  async reorderSubTopics(topicId: string, subTopicIds: string[]): Promise<void> {
    await delay(300);
    const topic = mockSheetData.topics.find(t => t.id === topicId);
    if (!topic) return;

    const reorderedSubTopics = subTopicIds
      .map(id => topic.subTopics.find(st => st.id === id))
      .filter(Boolean) as SubTopic[];
    
    reorderedSubTopics.forEach((subTopic, index) => {
      subTopic.order = index;
    });
    
    topic.subTopics = reorderedSubTopics;
  },

  async reorderQuestions(
    topicId: string,
    subTopicId: string,
    questionIds: string[]
  ): Promise<void> {
    await delay(300);
    const topic = mockSheetData.topics.find(t => t.id === topicId);
    const subTopic = topic?.subTopics.find(st => st.id === subTopicId);
    if (!subTopic) return;

    const reorderedQuestions = questionIds
      .map(id => subTopic.questions.find(q => q.id === id))
      .filter(Boolean) as Question[];
    
    reorderedQuestions.forEach((question, index) => {
      question.order = index;
    });
    
    subTopic.questions = reorderedQuestions;
  },
};