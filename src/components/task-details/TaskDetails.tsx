import { useDispatch, useSelector } from "react-redux";
import { selectTask } from '../../features/taskSlice';
import { Fade, IconButton } from "@mui/material";
import './style.scss';
import { RootState } from "../../stores/root";
import ForwardIcon from '@mui/icons-material/Forward';
import CloseIcon from '@mui/icons-material/Close';
import { COLUMN_TASK_STATES_MAP } from "../../constants/board";
export function TaskDetails() {
    const dispatch = useDispatch();
    const task = useSelector((state: RootState) => state.tasks.selectedTask);
    const allTasksHistory = useSelector((state: RootState) => state.tasks.history);

    const currentTaskHistory = task ? (allTasksHistory[task?.id] || []) : [];

    function handleClose() {
        // @ts-ignore
        dispatch(selectTask(undefined));
    }

    return <>{
        task ?
            <div>
                <Fade in={true}>
                    <div className="task-details">

                        <div className="task-details-header">
                            <h2>{task.name}</h2>
                            <IconButton aria-label="delete" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>

                        <div>
                            {
                                Object.keys(task).map(key => {
                                    // @ts-ignore
                                    return <p><strong className="task-details-key">{key}</strong> {task[key]}</p>
                                })
                            }
                        </div>
                        <h2>History</h2>
                        <div className="task-history">
                            {
                                currentTaskHistory.map(history => {
                                    // @ts-ignore
                                    return <p className="history-item"><label>{COLUMN_TASK_STATES_MAP[history.from]}</label> <ForwardIcon /> <label>{COLUMN_TASK_STATES_MAP[history.to]}</label></p>
                                })
                            }
                        </div>
                        {
                            !currentTaskHistory.length ? <p>No history</p> : null
                        }

                    </div>
                </Fade>
            </div>
            : null
    }</>
}