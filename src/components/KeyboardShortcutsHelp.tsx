/**
 * Keyboard shortcuts help dialog + floating trigger button
 *
 * Author: Om Pandey
 * Provides discoverability for global keyboard shortcuts
 */

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Keyboard } from "lucide-react";

interface KeyboardShortcutsHelpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const shortcuts = [
  { keys: ["Ctrl", "K"], description: "Focus search" },
  { keys: ["Ctrl", "N"], description: "Create new topic" },
  { keys: ["Ctrl", "E"], description: "Expand / collapse all topics" },
  { keys: ["?"], description: "Show keyboard shortcuts" },
  { keys: ["Esc"], description: "Close dialogs" },
];

export function KeyboardShortcutsHelp({
  open,
  onOpenChange,
}: KeyboardShortcutsHelpProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2"
            >
              <span className="text-gray-700">
                {shortcut.description}
              </span>

              <div className="flex gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <Badge
                    key={keyIndex}
                    variant="outline"
                    className="font-mono"
                  >
                    {key}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Tip: Use <span className="font-mono">Cmd</span> instead of{" "}
          <span className="font-mono">Ctrl</span> on macOS.
        </p>
      </DialogContent>
    </Dialog>
  );
}

export function KeyboardShortcutsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0 shadow-lg
                   hover:shadow-xl transition-all bg-white border border-gray-300
                   hover:border-primary z-50"
        title="Keyboard Shortcuts (Press ?)"
      >
        <Keyboard className="w-5 h-5 text-gray-600" />
      </Button>

      <KeyboardShortcutsHelp open={open} onOpenChange={setOpen} />
    </>
  );
}
