import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Question } from '../../types';

interface QuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (question: Omit<Question, 'id' | 'order'>) => void;
  initialData?: Question;
  mode: 'create' | 'edit';
}

export function QuestionDialog({ open, onOpenChange, onSubmit, initialData, mode }: QuestionDialogProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>(
    initialData?.difficulty || 'Easy'
  );
  const [url, setUrl] = useState(initialData?.url || '');
  const [notes, setNotes] = useState(initialData?.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        difficulty,
        url: url.trim() || undefined,
        notes: notes.trim() || undefined,
        completed: initialData?.completed || false,
      });
      // Reset form
      setTitle('');
      setDifficulty('Easy');
      setUrl('');
      setNotes('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Question' : 'Edit Question'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="question-title">Question Title *</Label>
              <Input
                id="question-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Two Sum, Reverse Linked List"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="question-difficulty">Difficulty</Label>
              <Select value={difficulty} onValueChange={(value: any) => setDifficulty(value)}>
                <SelectTrigger id="question-difficulty">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="question-url">Problem URL (Optional)</Label>
              <Input
                id="question-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://leetcode.com/problems/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="question-notes">Notes (Optional)</Label>
              <Textarea
                id="question-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes, hints, or approach"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{mode === 'create' ? 'Create' : 'Save'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
