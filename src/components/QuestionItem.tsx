/**
 * QuestionItem
 * -------------------------
 * Renders a single question row with completion state,
 * difficulty indicator, and edit/delete actions.
 *
 * Author: Om Pandey
 */

import { useState } from 'react';
import type { Question as QuestionType } from '../types';
import { useSheetStore } from '../store/sheetStore';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { QuestionDialog } from './dialogs/QuestionDialog';
import { Edit2, Trash2, GripVertical } from 'lucide-react';

interface QuestionItemProps {
  question: QuestionType;
  topicId: string;
  subTopicId: string;
  dragHandleProps?: any;
}

const difficultyStyles: Record<QuestionType['difficulty'], string> = {
  Easy: 'bg-green-100 text-green-700 border-green-200',
  Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Hard: 'bg-red-100 text-red-700 border-red-200',
};

export function QuestionItem({
  question,
  topicId,
  subTopicId,
  dragHandleProps,
}: QuestionItemProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const {
    toggleQuestionComplete,
    updateQuestion,
    deleteQuestion,
  } = useSheetStore();

  const handleToggleComplete = () => {
    toggleQuestionComplete(topicId, subTopicId, question.id);
  };

  const handleEdit = (updated: Omit<QuestionType, 'id' | 'order'>) => {
    updateQuestion(topicId, subTopicId, question.id, updated);
  };

  const handleDelete = () => {
    deleteQuestion(topicId, subTopicId, question.id);
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="group flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors">
        {/* Drag handle */}
        <div
          {...dragHandleProps}
          className="cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>

        {/* Completion checkbox */}
        <Checkbox
          checked={question.completed}
          onCheckedChange={handleToggleComplete}
          className="w-5 h-5 border-2 rounded-full data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
        />

        {/* Title */}
        <div className="flex-1 min-w-0">
          <span
            className={`text-sm ${
              question.completed
                ? 'line-through text-gray-500'
                : 'text-gray-900'
            }`}
          >
            {question.title}
          </span>
        </div>

        {/* Difficulty badge */}
        <Badge
          variant="outline"
          className={`text-xs font-medium border ${difficultyStyles[question.difficulty]}`}
        >
          {question.difficulty}
        </Badge>

        {/* Actions */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditOpen(true)}
            className="h-7 w-7 p-0"
          >
            <Edit2 className="w-3.5 h-3.5 text-gray-500" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteOpen(true)}
            className="h-7 w-7 p-0"
          >
            <Trash2 className="w-3.5 h-3.5 text-gray-500" />
          </Button>
        </div>
      </div>

      {/* Edit dialog */}
      <QuestionDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleEdit}
        mode="edit"
        initialData={question}
      />

      {/* Delete confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Question</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete “{question.title}”?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
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