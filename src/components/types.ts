import { TASK_SATES } from "../constants/board"

export type ColumnT = {
    id: string,
    state: string,
    requiredFeilds: Array<string>
}

export type TaskT = {
    id: string,
    name: string,
    description: '',
    // @ts-ignore : TODO, we should be able to get dynamic type created using $Values (fix this)
    state:  $Values<typeof TASK_SATES>
}

export type AllTasks = {
    [columnId: string]: Array<TaskT>
}