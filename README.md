# Interactive Question Management Sheet

A frontend web application built as part of an internship assignment.  
The app allows users to manage topics, sub-topics, and questions in a structured and interactive way.

---

## 🌐 Live Demo
https://0xpandey.github.io/Frontend/

---

## 📌 Features
- Create and organize topics and sub-topics
- Add, edit, and manage questions
- Interactive UI with reusable components
- Clean state management and component separation
- Responsive layout for different screen sizes

---

## 🛠 Tech Stack
- **React** – component-based UI development
- **TypeScript** – type safety and better maintainability
- **Vite** – fast development and optimized builds
- **Tailwind CSS** – utility-first styling
- **Radix UI** – accessible UI primitives

---

## 🧠 Design & Implementation Decisions
- Component-driven architecture for reusability and clarity
- Centralized state handling to avoid prop drilling
- Utility-based styling to keep UI consistent
- Aliases (`@/`) used for cleaner imports
- Configured `base` path for GitHub Pages deployment

---

## 🤖 Use of AI Tools
AI tools were used for initial ideation, boilerplate setup, and minor refactoring suggestions.  
All core logic, structure decisions, and final implementation were reviewed, refined, and understood by me.

---

## 🚀 Getting Started (Local Setup)

```bash
npm install
npm run dev
```
📂 Project Structure (Simplified)
```text
src/
 ├── App.tsx
 ├── types/
 │   └── index.ts
 ├── store/
 │   └── sheetStore.ts
 ├── services/
 │   └── mockApi.ts
 ├── hooks/
 │   └── useKeyboardShortcuts.ts
 ├── components/
 │   ├── TopicCard.tsx
 │   ├── SubTopicSection.tsx
 │   ├── QuestionItem.tsx
 │   ├── dialogs/
 │   ├── dnd/
 │   └── ui/
 └── styles/
     └── globals.css
```

###🔮 Possible Improvements

*Persist data using backend or local storage
*Add drag-and-drop reordering
*Improve accessibility and keyboard navigation
*Add unit tests for components


###Author

Om Pandey
B.Tech – Computer Science & Engineering
