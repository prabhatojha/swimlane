import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AllTasks, TaskHistory, TaskT } from '../components/types'
import { TASK_SATES } from '../constants/board'
import { filterTheTasks } from '../utils/swimlane-column'

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
    },
    {
      id: 'task-id-3',
      name: 'Dev task 3',
      description: 'Dev task 3',
      state: TASK_SATES.TODO
    },
    {
      id: 'task-id-4',
      name: 'Dev task 4',
      description: 'Dev task 4',
      state: TASK_SATES.TODO
    }
  ],
  '2': [
    {
      id: 'task-id-5',
      name: 'As a user, I should be able to see the product name',
      description: 'As a user, I should be able to see the product name',
      state: TASK_SATES.IN_PROGRESS
    },
    {
      id: 'task-id-6',
      name: 'UI dev task (1/2)',
      description: 'Complete the UI development',
      state: TASK_SATES.IN_PROGRESS
    }
  ],
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
  value: AllTasks;
  originalState: AllTasks;
  history: {
    [taskId: string]: TaskHistory
  }
  selectedTask?: TaskT;
  filters: {
    query: string
  };
}

const initialState: TasksState = {
  // @ts-ignore : TODO, fix type here
  value: INITIAL_TASKS,
  // @ts-ignore : TODO, fix type here
  originalState: INITIAL_TASKS,
  history: {},
  selectedTask: undefined,
  filters: {
    query: ''
  }
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

      const { originalState } = current(state);
      const fromList = [...originalState[fromColumnId]];
      const movingTaskIndex = fromList.findIndex(task => task.id === taskId);
      const task = fromList[movingTaskIndex];

      state.originalState[fromColumnId].splice(movingTaskIndex, 1);

      state.history[taskId] = [...(state.history[taskId] || []), {from: fromColumnId, to: toColumnId}];
      state.originalState[toColumnId].push({...task, ...addionalProps});

      state.value = filterTheTasks(state.originalState, state.filters);
    },
    selectTask: (state, action: PayloadAction<TaskT>) => {
      state.selectedTask = action.payload;
    },
    filterTasks: (state, action: PayloadAction<string>) => {
      state.filters.query = action.payload;
      state.value = filterTheTasks(state.originalState, state.filters);
    }
  },
});

export const { moveTask, selectTask, filterTasks } = taskSlice.actions
export default taskSlice.reducer

