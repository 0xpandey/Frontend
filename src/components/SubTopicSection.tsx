import { useState, useCallback } from 'react';
import { SubTopic as SubTopicType } from '../types';
import { useSheetStore } from '../store/sheetStore';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
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
import { SubTopicDialog } from './dialogs/SubTopicDialog';
import { QuestionDialog } from './dialogs/QuestionDialog';
import { DraggableQuestion } from './dnd/DraggableQuestion';
import { ChevronDown, ChevronRight, Edit2, Trash2, GripVertical } from 'lucide-react';

interface SubTopicSectionProps {
  subTopic: SubTopicType;
  topicId: string;
  dragHandleProps?: any;
}

export function SubTopicSection({ subTopic, topicId, dragHandleProps }: SubTopicSectionProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [createQuestionOpen, setCreateQuestionOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { updateSubTopic, deleteSubTopic, createQuestion, reorderQuestions } = useSheetStore();

  const handleEdit = (name: string) => {
    updateSubTopic(topicId, subTopic.id, { name });
  };

  const handleDelete = () => {
    deleteSubTopic(topicId, subTopic.id);
    setDeleteOpen(false);
  };

  const handleCreateQuestion = (question: any) => {
    createQuestion(topicId, subTopic.id, question);
  };

  const moveQuestion = useCallback((dragIndex: number, hoverIndex: number) => {
    const questions = [...subTopic.questions];
    const draggedQuestion = questions[dragIndex];
    questions.splice(dragIndex, 1);
    questions.splice(hoverIndex, 0, draggedQuestion);
    
    const questionIds = questions.map(q => q.id);
    reorderQuestions(topicId, subTopic.id, questionIds);
  }, [subTopic.questions, topicId, subTopic.id, reorderQuestions]);

  return (
    <>
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        {/* Sub-topic Header */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 border-b border-gray-200 group">
          <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-0 h-auto hover:bg-transparent"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </Button>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900 text-sm">
                {subTopic.order + 1} {subTopic.name}
              </span>
              {subTopic.questions.length > 0 && (
                <Badge variant="secondary" className="text-xs font-normal text-gray-600 bg-white border border-gray-200">
                  {subTopic.questions.length} Questions
                </Badge>
              )}
            </div>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => setEditOpen(true)} className="h-7 w-7 p-0">
              <Edit2 className="w-3.5 h-3.5 text-gray-500" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setDeleteOpen(true)} className="h-7 w-7 p-0">
              <Trash2 className="w-3.5 h-3.5 text-gray-500" />
            </Button>
          </div>
        </div>

        {/* Questions List */}
        {!isCollapsed && (
          <div className="p-3 space-y-2">
            {subTopic.questions.map((question, index) => (
              <DraggableQuestion
                key={question.id}
                question={question}
                topicId={topicId}
                subTopicId={subTopic.id}
                index={index}
                moveItem={moveQuestion}
              />
            ))}
            
            {/* Add Question Button */}
            <button
              onClick={() => setCreateQuestionOpen(true)}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg py-2.5 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-lg">+</span>
              Add Question to {subTopic.order + 1}
            </button>
          </div>
        )}
      </div>

      <SubTopicDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleEdit}
        mode="edit"
        initialData={{ name: subTopic.name }}
      />

      <QuestionDialog
        open={createQuestionOpen}
        onOpenChange={setCreateQuestionOpen}
        onSubmit={handleCreateQuestion}
        mode="create"
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Sub-topic</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{subTopic.name}"? This will also delete all questions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}