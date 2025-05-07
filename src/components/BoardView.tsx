import type { DropResult } from '@hello-pangea/dnd';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useEffect, useRef, useState } from 'react';
import { AddColumnButton } from '@/components/AddColumnButton';
import { useColumn } from '@/hooks/useColumn';
import { TaskModal } from '@/components/TaskModal';
import { useTask } from '@/hooks/useTask';
import type { Task } from '@/types/types.ts';
import { Column } from '@/components/Column.tsx';

export function BoardView() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { list, create, load } = useColumn();
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const { batchUpdate } = useTask();
  
  useEffect(() => {
    const el = scrollContainerRef.current;

    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY });
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || !list) {
      return;
    }

    const sourceCol = list.find((col) => col.id === source.droppableId);
    const destCol = list.find((col) => col.id === destination.droppableId);

    if (!sourceCol || !destCol) {
      return;
    }

    const movedTask = sourceCol.tasks[source.index];

    if (!movedTask) {
      return;
    }

    if (sourceCol.id === destCol.id) {
      const updatedTasks = [...sourceCol.tasks];
      updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);

      await batchUpdate(
        updatedTasks.map((task, i) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          order: i,
          columnId: task.columnId,
        })),
      );
    } else {
      const updatedSourceTasks = [...sourceCol.tasks];
      updatedSourceTasks.splice(source.index, 1);

      const updatedDestTasks = [...destCol.tasks];
      updatedDestTasks.splice(destination.index, 0, movedTask);

      await batchUpdate([
        ...updatedSourceTasks.map((task, i) => ({
          id: task.id,
          title: task.title,
          columnId: task.columnId,
          description: task.description,
          order: i,
        })),
        ...updatedDestTasks.map((task, i) => ({
          id: task.id,
          order: i,
          title: task.title,
          description: task.description,
          columnId: destCol.id,
        })),
      ]);
    }

    load();
  };

  const addColumn = (title: string) => {
    create({ title, order: list?.length || 0 }).then(() => load());
  };

  return (
    <div className="max-w-full overflow-x-auto px-4" ref={scrollContainerRef}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 min-w-[1100px] py-4">
          {list?.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-72 bg-white rounded-xl shadow border border-gray-200 p-4 flex-shrink-0"
                >
                  <Column
                    provided={provided}
                    setActiveColumnId={setActiveColumnId}
                    setModalOpen={setModalOpen}
                    column={column}
                    setEditTask={setEditTask}
                  />
                </div>
              )}
            </Droppable>
          ))}
          <AddColumnButton onCreate={addColumn} />
        </div>
      </DragDropContext>

      {activeColumnId && (
        <TaskModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditTask(null);
          }}
          columnId={activeColumnId}
          task={editTask}
        />
      )}
    </div>
  );
}
