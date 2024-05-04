import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AllTasks } from '../components/types'
import { TASK_SATES } from '../constants/board'

export const INITIAL_TASKS = {
  '1': [
    {
      id: 'task-id-1',
      name: 'Requirement gathering',
      description: 'Gather software requirements',
      state: TASK_SATES.TODO
    },
    {
      id: 'task-id-2',
      name: 'Design documents',
      description: 'Design the detailed documenatation',
      state: TASK_SATES.TODO
    }
  ],
  '2': [],
  '3': [
    {
      id: 'task-id-3',
      name: 'Dev task 1', 
      description: 'Create the basic setup', 
      state: TASK_SATES.IN_REVIEW
    },
  ],
  '4': []
}


export interface TasksState {
  value: AllTasks
}

const initialState: TasksState = {
  // @ts-ignore : TODO, fix type here
  value: INITIAL_TASKS,
}

type PayloadActionProps = 
  {fromColumnId: string, toColumnId: string, taskId: string, addionalProps: {
    [field: string]: string
  }};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    moveTask: (state, action: PayloadAction<PayloadActionProps>) => {
      const {fromColumnId, toColumnId, taskId, addionalProps = {}} = action.payload;

      const { value } = current(state);
      const fromList = [...value[fromColumnId]];
      const movingTaskIndex = fromList.findIndex(task => task.id === taskId);
      const task = fromList[movingTaskIndex];

      state.value[fromColumnId].splice(movingTaskIndex, 1);
      state.value[toColumnId].push({...task, ...addionalProps});
    },
  },
});

export const { moveTask } = taskSlice.actions

export default taskSlice.reducer

