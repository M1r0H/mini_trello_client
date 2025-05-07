import { Trash2 } from 'lucide-react';
import { useTask } from '@/hooks/useTask';
import { useState } from 'react';
import type { Task } from '@/types/types';
import { ConfirmDialog } from '@/components/ConfirmDialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useColumn } from '@/hooks/useColumn.tsx';

interface TaskCardProps {
  currentTask: Task;
  allTasksByColumn: Task[];
}

export function TaskCard(props: TaskCardProps) {
  const { currentTask, allTasksByColumn } = props;
  const { remove, batchUpdate } = useTask();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { load } = useColumn();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const filtered = allTasksByColumn.filter((t) => t.id !== currentTask.id);

    await remove(currentTask.id);

    batchUpdate(
      filtered.map((task, index) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        columnId: task.columnId,
        order: index,
      })),
    )
      .then(load)
      .finally(() =>  setConfirmOpen(false));
  };

  return (
    <>
      <div className="p-2 text-sm hover:bg-accent cursor-pointer flex items-center justify-between">
        {currentTask.title}
        <Button
          className="text-muted-foreground hover:text-red-600 transition"
          onClick={(e) => {
            e.stopPropagation();
            setConfirmOpen(true);
          }}
        >
          <Trash2 size={16} />
        </Button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onConfirm={(e) => handleDelete(e)}
        onCancel={() => setConfirmOpen(false)}
        title="Delete task"
        description="Are you sure you want to delete this task?"
      />
    </>
  );
}
