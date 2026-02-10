# Interactive Question Management Sheet

This project is a single-page web application built to manage questions in a structured hierarchy using **Topics → Sub-topics → Questions**.

The goal of the project is to practice building a real-world React application with proper state management, reusable components, and interactive UI features such as drag-and-drop and search.

---

## Features

- Organize questions under topics and sub-topics
- Create, edit, and delete topics, sub-topics, and questions
- Drag and drop to reorder items at every level
- Mark questions as completed
- Visual progress tracking for topics
- Search across topics, sub-topics, and questions
- Responsive layout for desktop and mobile

---

## Tech Stack

- **React** (with TypeScript)
- **Zustand** for state management
- **Tailwind CSS** for styling
- **react-dnd** for drag and drop
- **Radix UI / shadcn-ui** for UI components
- **Vite** for development and build tooling

---

## Project Structure

src/
├── App.tsx
├── types/
│ └── index.ts
├── store/
│ └── sheetStore.ts
├── services/
│ └── mockApi.ts
├── hooks/
│ └── useKeyboardShortcuts.ts
├── components/
│ ├── TopicCard.tsx
│ ├── SubTopicSection.tsx
│ ├── QuestionItem.tsx
│ ├── dialogs/
│ ├── dnd/
│ └── ui/
└── styles/
└── globals.css

Author

Om Pandey
B.Tech – Computer Science & Engineering