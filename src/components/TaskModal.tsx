import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useTask } from '@/hooks/useTask.tsx';
import { useColumn } from '@/hooks/useColumn.tsx';
import type { Task, TaskFormData } from '@/types/types.ts';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  columnId: string;
  task?: Task | null;
}

export const TaskModal = ({ open, onClose, columnId, task }: TaskModalProps) => {
  const { register, handleSubmit, reset, setValue } = useForm<TaskFormData>();
  const { create, update, batchUpdate } = useTask();
  const column = useColumn();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setValue('title', task.title);
      setValue('description', task.description || '');
    } else {
      reset();
    }
  }, [task, setValue, reset]);

  const onSubmit = async (data: TaskFormData) => {
    setLoading(true);

    const targetColumn = column.list?.find((c) => c.id === columnId);

    if (!targetColumn) {
      setLoading(false);

      return;
    }

    try {
      if (task) {
        await update(task.id, {
          ...data,
          columnId,
          order: task.order,
        });
      } else {
        const updatedTasks = targetColumn.tasks.map((t) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          columnId: t.columnId,
          order: t.order + 1,
        }));

        if (updatedTasks.length > 0) {
          await batchUpdate(updatedTasks);
        }

        await create({
          ...data,
          columnId,
          order: 0,
        });
      }

      await column.load();
      reset();
      onClose();
    } catch (error) {
      console.error(task ? 'Failed to update task:' : 'Failed to create task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Create Task'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register('title', { required: true })}
            placeholder="Task title"
          />
          <Textarea
            {...register('description')}
            placeholder="Task description"
            className="min-h-[100px]"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (task ? 'Saving...' : 'Creating...') : task ? 'Save' : 'Create'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
