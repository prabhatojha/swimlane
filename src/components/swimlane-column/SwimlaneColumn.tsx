import { ColumnT } from "../types"
import type { RootState } from '../../stores/root'
import { useSelector, useDispatch } from 'react-redux'
import { moveTask } from '../../features/taskSlice';
import { TaskCard } from "../task-card/TaskCard";
import './style.scss';
import { DragEvent, useRef, useState } from "react";
import { validateMinDataRequirement, validateTargetColumn } from "../../utils/swimlane-column";
import { MoreDetailsModal } from "../modals/more-details/MoreDetailsModal";



type SwimlaneColumnPropsT = {
    column: ColumnT;
}
/**
 * - Will host all the task in current column state
 * - Responsible to dispatch item move action into the store
 */
export function SwimlaneColumn(props: SwimlaneColumnPropsT) {
    const [requiredFields, setRequiredFields] = useState<Array<string>>([]);
    const allTasks = useSelector((state: RootState) => state.tasks.value);
    const dispatch = useDispatch();
    const movingTaskDetails = useRef({});

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
         *      - get from column from SWIMLANE_CONFIG
         *      - get moveableTo state
         *      - check if toColumnId is part of moveableTo
         * - Ask for additinal params
         *      - get to column from SWIMLANE_CONFIG
         *      - get requiredFeilds 
         *      - validate if moving task has all the required data field
         *      - If no, open a dialog
         *      - If yes, trigger move
         */

        movingTaskDetails.current = {
            fromColumnId,
            toColumnId: columnId,
            taskId
        }

        const isValidTargetColumn = validateTargetColumn({ fromColumnId, toColumnId: columnId });
        if (!isValidTargetColumn) {
            return;
        }

        const requiredFields = validateMinDataRequirement({
            fromColumnId, toColumnId: columnId, allTasks, taskId
        });

        console.log('>>>> requiredFields: ', requiredFields);

        if (requiredFields?.length) {
            setRequiredFields(requiredFields);
            return;
        }
        
        triggerMove(movingTaskDetails.current);
    }

    function triggerMove(payload: any) {
        dispatch(moveTask(payload));
    }

    function onSuccess(addionalProps: any) {
        triggerMove({
            ...movingTaskDetails.current,
            addionalProps,
        });

        setRequiredFields([]);
    }

    function onCancel() {
        setRequiredFields([]);
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
        {requiredFields.length ? <MoreDetailsModal onCancel={onCancel} onSuccess={onSuccess} requiredFields={requiredFields} /> : null}
    </>;
}