import type { Action, State } from "./types";

export function taskReducer(state: State, action: Action) {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task._id === action.payload?._id ? action.payload : task
                )
            };
        case 'UPDATE_TASK_STATUS':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task._id === action.payload?._id ? { ...task, status: action.payload?.status } : task
                )
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload?._id)
            };

        case 'SET_TASKS':
            return {
                tasks: structuredClone(action.payload)
            }
        default:
            return state;
    }
}