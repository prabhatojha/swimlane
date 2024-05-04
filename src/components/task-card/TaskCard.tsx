import { DragEvent } from "react";
import { TaskT } from "../types";
import './style.scss';

type TaskCardPropsT = {
    task: TaskT;
    columnId: string;
}
export function TaskCard(props: TaskCardPropsT) {
    const {task, columnId} = props;
    const {name, description, id} = task;

    function onDrag(event: DragEvent){
        event.dataTransfer.setData("fromColumnId", columnId);
        event.dataTransfer.setData("taskId", id);
    }
    
    return <div className="task-card" draggable onDragStart={onDrag}>
        <h3>{name}</h3>
        <p>{description}</p>
    </div>
}