
export const TASK_SATES = Object.freeze({
    TODO: 'Todo',
    IN_PROGRESS: 'In Progress',
    IN_REVIEW: 'In Review',
    DONE: 'Done',
});

export const SWIMLANE_CONFIG = [
    {
        id: '1',
        state: TASK_SATES.TODO,
        requiredFeilds: ['name'],
        moveableTo: [TASK_SATES.IN_PROGRESS]
    },
    {
        id: '2',
        state: TASK_SATES.IN_PROGRESS,
        requiredFeilds: ['name', 'description'],
        moveableTo: [TASK_SATES.IN_REVIEW, TASK_SATES.DONE]
    },
    {
        id: '3',
        state: TASK_SATES.IN_REVIEW,
        requiredFeilds: ['name', 'description', 'timespent'],
        moveableTo: [TASK_SATES.TODO, TASK_SATES.DONE]
    },
    {
        id: '4',
        state: TASK_SATES.DONE,
        requiredFeilds: ['name', 'description', 'timespent', 'comment'],
        moveableTo: []
    }
]