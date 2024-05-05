import { DashboardFilters } from '../../components/dashboard-filters/DashboardFilters';
import { SwimlaneColumn } from '../../components/swimlane-column/SwimlaneColumn';
import { TaskDetails } from '../../components/task-details/TaskDetails';
import { SWIMLANE_CONFIG } from '../../constants/board';
import './style.scss';
/**
 * - host all the columns
 * 
 */
export function SwimlaneDashboard() {
    return <>
        <DashboardFilters />
        <div className='swimlane-dashboard'>
            {
                SWIMLANE_CONFIG.map(column => {
                    return <SwimlaneColumn column={column} />
                })
            }
            <TaskDetails />
        </div>
    </>
}