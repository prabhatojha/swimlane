import { TextField } from "@mui/material";
import './style.scss';
import { useDispatch } from "react-redux";
import { filterTasks } from "../../features/taskSlice";
import { useState } from "react";
export function DashboardFilters() {
    // const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    
    function onSearch(query: string) {
        dispatch(filterTasks(query.toLowerCase()))
    }

    return <div className="dashboard-filters">
        <label>Filters</label>
        <TextField className="text-box" size="small" onChange={(e) => onSearch(e.target.value)} id="outlined-basic" label="Search for task name" variant="filled" />
    </div>
}