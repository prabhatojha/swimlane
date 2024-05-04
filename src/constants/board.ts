
export const TASK_SATES = Object.freeze({
    TODO: 'Todo',
    IN_PROGRESS: 'In Progress',
    IN_REVIEW: 'In Review',
    DONE: 'Done',
});

export const COLUMN_IDS = Object.freeze({
    TODO: '1',
    IN_PROGRESS: '2',
    IN_REVIEW: '3',
    DONE: '4',
});

// export const COLUMN_TASK_STATES_MAP = Object.freeze({
//     TODO: '1',
//     IN_PROGRESS: '2',
//     IN_REVIEW: '3',
//     DONE: '4',
// });

export const SWIMLANE_CONFIG = [
    {
        id: COLUMN_IDS.TODO,
        state: TASK_SATES.TODO,
        requiredFeilds: ['name'],
        moveableTo: [COLUMN_IDS.IN_PROGRESS]
    },
    {
        id: COLUMN_IDS.IN_PROGRESS,
        state: TASK_SATES.IN_PROGRESS,
        requiredFeilds: ['name', 'description'],
        moveableTo: [COLUMN_IDS.IN_REVIEW, COLUMN_IDS.DONE]
    },
    {
        id: COLUMN_IDS.IN_REVIEW,
        state: TASK_SATES.IN_REVIEW,
        requiredFeilds: ['name', 'description', 'timespent'],
        moveableTo: [COLUMN_IDS.TODO, COLUMN_IDS.DONE]
    },
    {
        id: COLUMN_IDS.DONE,
        state: TASK_SATES.DONE,
        requiredFeilds: ['name', 'description', 'timespent', 'comment'],
        moveableTo: []
    }
];

export const FIELD_NAME_LABEL : {[name: string]: string} = {
    name: 'Name',
    description: 'Description',
    timespent: 'Time Spent',
    comment: 'Comment',
};