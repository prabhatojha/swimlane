import { DragEvent } from "react";
import { TaskT } from "../types";
import './style.scss';
import { selectTask } from '../../features/taskSlice';
import { useDispatch } from "react-redux";
type TaskCardPropsT = {
    task: TaskT;
    columnId: string;
}
export function TaskCard(props: TaskCardPropsT) {
    const { task, columnId } = props;
    const { name, description, id } = task;
    const dispatch = useDispatch();


    function onDrag(event: DragEvent) {
        event.dataTransfer.setData("fromColumnId", columnId);
        event.dataTransfer.setData("taskId", id);
    }

    function onSelect() {
        dispatch(selectTask(task));
    }

    return <>
        <div className="task-card" draggable onDragStart={onDrag} onClick={onSelect}>
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    </>
}