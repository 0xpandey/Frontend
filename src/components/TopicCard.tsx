/**
 * Topic card component
 * Displays a single topic with its sub-topics
 *
 * Author: Om Pandey
 */

import { useState, useCallback } from "react";
import { Topic as TopicType } from "../types";
import { useSheetStore } from "../store/sheetStore";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { TopicDialog } from "./dialogs/TopicDialog";
import { SubTopicDialog } from "./dialogs/SubTopicDialog";
import { DraggableSubTopic } from "./dnd/DraggableSubTopic";
import { ChevronDown, ChevronRight, GripVertical } from "lucide-react";

interface TopicCardProps {
  topic: TopicType;
  dragHandleProps?: any;
}

const topicColors = [
  "#5b5ff9",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

export function TopicCard({ topic, dragHandleProps }: TopicCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [createSubTopicOpen, setCreateSubTopicOpen] = useState(false);

  const {
    updateTopic,
    deleteTopic,
    createSubTopic,
    collapsedTopics,
    toggleTopicCollapse,
    reorderSubTopics,
  } = useSheetStore();

  const isCollapsed = collapsedTopics.has(topic.id);
  const topicColor = topicColors[topic.order % topicColors.length];

  const moveSubTopic = useCallback(
    (from: number, to: number) => {
      const reordered = [...topic.subTopics];
      const [item] = reordered.splice(from, 1);
      reordered.splice(to, 0, item);

      reorderSubTopics(
        topic.id,
        reordered.map((st) => st.id)
      );
    },
    [topic.subTopics, topic.id, reorderSubTopics]
  );

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="relative">
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ backgroundColor: topicColor }}
          />

          <div className="flex items-center gap-3 p-4">
            <div
              {...dragHandleProps}
              className="cursor-grab active:cursor-grabbing opacity-0 hover:opacity-100 transition-opacity"
            >
              <GripVertical className="w-4 h-4 text-gray-400" />
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleTopicCollapse(topic.id)}
              className="p-0 h-auto hover:bg-transparent"
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </Button>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">
                  {topic.order + 1}. {topic.name}
                </h3>

                <Badge
                  variant="secondary"
                  className="text-xs font-normal text-gray-600 bg-gray-100 border-0"
                >
                  {topic.subTopics.length} sub-topics
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-topics */}
        {!isCollapsed && (
          <div className="px-4 pb-4 space-y-3">
            {topic.subTopics.map((subTopic, index) => (
              <DraggableSubTopic
                key={subTopic.id}
                subTopic={subTopic}
                topicId={topic.id}
                index={index}
                moveItem={moveSubTopic}
              />
            ))}

            <button
              onClick={() => setCreateSubTopicOpen(true)}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-lg">+</span>
              Add sub-topic
            </button>
          </div>
        )}
      </div>

      <TopicDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={(name, description) =>
          updateTopic(topic.id, { name, description })
        }
        mode="edit"
        initialData={{
          name: topic.name,
          description: topic.description,
        }}
      />

      <SubTopicDialog
        open={createSubTopicOpen}
        onOpenChange={setCreateSubTopicOpen}
        onSubmit={(name) => createSubTopic(topic.id, name)}
        mode="create"
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Topic</AlertDialogTitle>
            <AlertDialogDescription>
              Deleting "{topic.name}" will remove all its sub-topics and
              questions. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTopic(topic.id)}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}