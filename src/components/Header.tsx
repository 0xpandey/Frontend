/**
 * Application header
 * Handles search, progress overview and topic creation
 *
 * Author: Om Pandey
 */

import { useState } from "react";
import { useSheetStore } from "../store/sheetStore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { TopicDialog } from "./dialogs/TopicDialog";
import { Search, Plus, LayoutGrid } from "lucide-react";

export function Header() {
  const [createTopicOpen, setCreateTopicOpen] = useState(false);
  const { sheet, searchQuery, setSearchQuery, createTopic } =
    useSheetStore();

  if (!sheet) return null;

  const { stats } = sheet;
  const progress =
    stats.totalQuestions > 0
      ? (stats.completedQuestions / stats.totalQuestions) * 100
      : 0;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">
              Interactive Question Sheet
            </span>
          </div>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search topics or questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9 bg-gray-50 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
              OP
            </div>
            <span className="text-sm font-medium text-gray-700">
              Om Pandey
            </span>
          </div>


          <Button
            onClick={() => setCreateTopicOpen(true)}
            data-topic-create
            className="bg-primary hover:bg-primary/90 h-9 px-4"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Topic
          </Button>
        </div>
      </div>

      {/* Page Info */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Badge
            variant="secondary"
            className="text-xs font-medium text-primary bg-primary/10 border-0 mb-3"
          >
            PRACTICE TRACKER
          </Badge>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {sheet.name}
              </h1>
              <p className="text-sm text-gray-500">
                Track progress across topics and questions
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">
                Overall Progress
              </p>
              <div className="flex items-center gap-2">
                <Progress value={progress} className="w-28 h-2" />
                <span className="text-sm font-semibold text-gray-900">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TopicDialog
        open={createTopicOpen}
        onOpenChange={setCreateTopicOpen}
        onSubmit={(name, description) =>
          createTopic(name, description)
        }
        mode="create"
      />
    </>
  );
}