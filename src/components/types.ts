import { TASK_SATES } from "../constants/board"

export type ColumnT = {
    id: string,
    state: string,
    requiredFeilds: Array<string>
}

export type TaskT = {
    id: string,
    name: string,
    description: string,
}

export type AllTasks = {
    [columnId: string]: Array<TaskT>
}

export type TaskHistory = Array<{
        from: string,
        to: string
}>;