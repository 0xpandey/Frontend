/**
 * Main application component
 *
 * Author: Om Pandey
 */

import { useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Plus } from "lucide-react";
import { Toaster } from "sonner";

import { useSheetStore, useFilteredSheet } from "./store/sheetStore";
import { Header } from "./components/Header";
import { DraggableTopic } from "./components/dnd/DraggableTopic";
import { KeyboardShortcutsButton } from "./components/KeyboardShortcutsHelp";
import { Button } from "./components/ui/button";

function App() {
  const {
    loading,
    searchQuery,
    setSearchQuery,
    loadSheet,
    reorderTopics,
    toggleAllTopics,
  } = useSheetStore();

  const sheet = useFilteredSheet();

  useEffect(() => {
    loadSheet("full-stack-curriculum");
  }, [loadSheet]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isCmd = e.ctrlKey || e.metaKey;

      if (isCmd && e.key === "k") {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
      }

      if (isCmd && e.key === "n") {
        e.preventDefault();
        document
          .querySelector<HTMLButtonElement>("[data-topic-create]")
          ?.click();
      }

      if (isCmd && e.key === "e") {
        e.preventDefault();
        toggleAllTopics();
      }

      if (e.key === "?" && !isCmd) {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault();
          document
            .querySelector<HTMLButtonElement>('[title*="Keyboard"]')
            ?.click();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleAllTopics]);

  const moveTopic = useCallback(
    (from: number, to: number) => {
      if (!sheet) return;

      const updated = [...sheet.topics];
      const [item] = updated.splice(from, 1);
      updated.splice(to, 0, item);

      reorderTopics(updated.map((t) => t.id));
    },
    [sheet, reorderTopics]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading sheet...</p>
        </div>
      </div>
    );
  }

  if (!sheet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="p-6 bg-white border rounded-md shadow-sm">
          <p className="mb-4 text-gray-600">Unable to load data.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="max-w-7xl mx-auto px-6 py-8">
          {sheet.topics.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-lg font-semibold mb-2">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : "No topics created yet"}
              </h3>

              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? "Try a different search"
                  : "Create a topic to get started"}
              </p>

              {searchQuery ? (
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              ) : (
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={() =>
                    document
                      .querySelector<HTMLButtonElement>(
                        "[data-topic-create]"
                      )
                      ?.click()
                  }
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Topic
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {sheet.topics.map((topic, index) => (
                <DraggableTopic
                  key={topic.id}
                  topic={topic}
                  index={index}
                  moveItem={moveTopic}
                />
              ))}
            </div>
          )}
        </main>

        <KeyboardShortcutsButton />
        <Toaster position="bottom-right" richColors />
      </div>
    </DndProvider>
  );
}

export default App;