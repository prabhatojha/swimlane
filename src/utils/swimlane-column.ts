import { AllTasks, TaskT } from "../components/types";
import { SWIMLANE_CONFIG } from "../constants/board";

export function validateTargetColumn(props: any) {
    const {fromColumnId, toColumnId} = props;
    const fromColumn = SWIMLANE_CONFIG.find(col => col.id === fromColumnId);
    return (fromColumn?.moveableTo as Array<string>).includes(toColumnId);
}

export function validateMinDataRequirement(props: any) {
    const {fromColumnId, toColumnId, allTasks, taskId} = props;
    const toColumn = SWIMLANE_CONFIG.find(col => col.id === toColumnId);
    const movingTask = allTasks[fromColumnId].find((task: TaskT) => task.id === taskId);
    return toColumn?.requiredFeilds.filter(field => movingTask[field] === undefined);
}

export function filterTheTasks(allTasks: AllTasks, filters: any) {
    const { query } = filters;
    return Object.keys(allTasks).reduce((acc, key) => {
        // @ts-ignore
        acc[key] = allTasks[key].filter(task => task.name.toLowerCase().includes(query));
        return acc;
    }, {})
}