import { createContext } from "preact";
import { useReducer } from "preact/hooks";
import { taskReducer } from "../reducer/task-reducer";
import type { State } from "../reducer/types";
import type { TaskContextType } from "./types";
import type { PropsWithChildren } from "preact/compat";

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialState: State = {
  tasks: [],
};

export function TaskProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch  }}>
      {props.children}
    </TaskContext.Provider>
  );
}
