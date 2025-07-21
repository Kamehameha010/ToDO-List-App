import { useEffect, useRef, useState } from "preact/hooks";
import { useTask } from "../../../hooks/task/use-task";
import { TaskItem } from "../card/task-item";
import type { TaskProps } from "../card/types";
import { useTaskFilter } from "../../../hooks/task/use-task-filter";
import type { TargetedEvent } from "preact/compat";

export function TaskList() {

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const idRef = useRef("");
  const {
    state: { tasks },
    getTasks,
    deleteTask,
  } = useTask();

  const { filters } = useTaskFilter();

  const closeDeleteDialog = () => setShowDeleteDialog((z) => !z);
  const closeEditDialog = () => setShowEditDialog((z) => !z);

  const handleDelete = async (e: TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    await deleteTask(idRef.current);
    setShowDeleteDialog(x => !x);
  };

  const handleEdit = async (e: TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    await deleteTask(idRef.current);
    setShowDeleteDialog(x => !x);
  };

  const selectedTask = (id: string) => {

    return (e: TargetedEvent<HTMLButtonElement, Event>) => {

      if (e.currentTarget.name.includes('btn-delete-task')) {
        setShowDeleteDialog(x => !x);
      }
      else if (e.currentTarget.name.includes('btn-edit-task')) {
        setShowEditDialog(x => !x);
      }
      idRef.current = id;

    };
  }

  useEffect(() => {
    getTasks(filters);
  }, [filters]);

  useEffect(() => {
    if (showDeleteDialog || showEditDialog) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showDeleteDialog]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            {...(task as TaskProps)}
            selectedTask={selectedTask}
          />
        ))}
      </div>
      {
        showDeleteDialog && (
          <dialog className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-0 m-0  w-screen h-screen" role="alertdialog">
            <form
              method="dialog"
              onSubmit={handleDelete}
              className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center"
            >
              <p className="mb-6 text-lg font-semibold text-black">
                Are you sure you want to delete this task?
              </p>
              <div className="flex justify-end w-full gap-4">
                <button
                  type="button"
                  onClick={closeDeleteDialog}
                  className="bg-gray-200/20 outline outline-gray-200 font-medium hover:bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </form>
          </dialog>
        )}

      {
        showEditDialog && (
          <dialog className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-0 m-0  w-screen h-screen" role="alertdialog">
            <form
              method="dialog"
              onSubmit={handleEdit}
              className="bg-white rounded-lg w-100 shadow-lg p-8 space-y-4 "
            >
              <h1 className="text-xl text-gray-900 font-semibold">Create New Task</h1>
              <div className="flex flex-col space-y-4">
                <input
                  className="text-sm h-10 px-3 py-2 outline outline-gray-200 rounded-md placeholder:text-gray-600 focus:outline-gray-500"
                  name="title"
                  type="text"
                  placeholder="Task Summary"

                  required />
                <textarea
                  className="text-sm h-15 px-3 py-2 outline outline-gray-200 rounded-md placeholder:text-gray-400 focus:outline-gray-500"
                  name="description"
                  placeholder="Description (optional)"
                >

                </textarea>
              </div>

              <div className="flex justify-between">
                <select
                  className="text-sm h-10 pl-3 pr-5 py-1.5 outline outline-gray-200 rounded-md cursor-pointer"
                  name="priority"

                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low" selected>Low Priority</option>
                </select>
34
              </div>

              <div className="flex justify-end w-full gap-4">
                <button
                  type="button"
                  onClick={closeEditDialog}
                  className="bg-gray-200/20 outline outline-gray-200 font-medium hover:bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </dialog>
        )}
    </>
  );
}
