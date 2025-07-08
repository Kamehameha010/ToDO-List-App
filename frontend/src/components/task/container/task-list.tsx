import { useEffect } from "preact/hooks";
import { useTask } from "../../../hooks/task/use-task"
import { TaskItem } from "../card/task-item"
import type { TaskProps } from "../card/types";
import { useTaskFilter } from "../../../hooks/task/use-task-filter";

export function TaskList() {

  const { state: { tasks }, getTasks } = useTask();
  const { filters } = useTaskFilter();
  useEffect(() => {

    getTasks(filters);

  }, [filters])

  return (
    <>
      <div className="grid grid-cols-1 gap-8">

        {
          tasks.map((task) => <TaskItem key={task._id} {...task as TaskProps} />)
        }

      </div>
    </>
  )
}