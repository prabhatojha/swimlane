import { ColumnT } from "../types"
import type { RootState } from '../../stores/root'
import { useSelector, useDispatch } from 'react-redux'
import { moveTask } from '../../features/taskSlice';
import { TaskCard } from "../task-card/TaskCard";
import './style.scss';
import { DragEvent } from "react";



type SwimlaneColumnPropsT = {
    column: ColumnT;
}
/**
 * - Will host all the task in current column state
 * - Responsible to dispatch item move action into the store
 */
export function SwimlaneColumn(props: SwimlaneColumnPropsT) {
    const allTasks = useSelector((state: RootState) => state.tasks.value);
    const dispatch = useDispatch();
    const { column } = props;
    const { id: columnId, state } = column;
    const thisColumnTasks = allTasks[columnId];

    function allowDrop(e: DragEvent) {
        e.preventDefault();
    }

    function onDrop(e: DragEvent) {
        e.preventDefault();
        const fromColumnId = e.dataTransfer.getData("fromColumnId");
        const taskId = e.dataTransfer.getData("taskId");

        /**
         * - Validate the target column
         * - validate the target column state
         */
        dispatch(moveTask({
            fromColumnId,
            toColumnId: columnId,
            taskId
        }));
    }

    return <>
        <div className="column-content" onDrop={onDrop} onDragOver={allowDrop}>
            <h4>{state}</h4>
            {
                thisColumnTasks.map(task => {
                    return <div>
                        <TaskCard task={task} columnId={columnId} />
                    </div>
                })
            }

        </div>
    </>;
}