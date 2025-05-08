import { Plus } from 'lucide-react';
import type { DroppableProvided } from '@hello-pangea/dnd';
import { Draggable } from '@hello-pangea/dnd';
import type { BoardColumn, Task } from '@/types/types';
import { TaskCard } from '@/components/TaskCard.tsx';

interface ColumnProps {
  column: BoardColumn;
  setActiveColumnId: (columnId: string) => void;
  setModalOpen: (open: boolean) => void;
  setEditTask: (task: Task) => void;
  provided: DroppableProvided;
}

export function Column(props: ColumnProps) {
  const { column, setActiveColumnId, setModalOpen, setEditTask, provided } = props;

  const handleOpenModal = (columnId: string) => {
    setActiveColumnId(columnId);
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">{column.title}</h2>
        <button
          onClick={() => handleOpenModal(column.id)}
          className="text-gray-500 hover:text-black"
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="flex flex-col gap-3 min-h-[20px]">
        {column.tasks.map((task, index) => (
          <Draggable
            key={ task.id }
            draggableId={ String(task.id) }
            index={ index }
          >
            { (provided) => (
              <div
                onClick={() => {
                  setActiveColumnId(column.id);
                  setEditTask(task);
                  setModalOpen(true);
                }}
                ref={ provided.innerRef }
                { ...provided.draggableProps }
                { ...provided.dragHandleProps }
                className="select-none bg-gray-50 hover:bg-gray-100 transition rounded-md px-3 py-2 text-sm font-medium text-gray-800 shadow"
              >
                <TaskCard currentTask={task} allTasksByColumn={column.tasks}/>
              </div>
            ) }
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    </>
  );
}
