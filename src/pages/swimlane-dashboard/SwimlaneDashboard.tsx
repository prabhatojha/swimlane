import { SwimlaneColumn } from '../../components/swimlane-column/SwimlaneColumn';
import { SWIMLANE_CONFIG } from '../../constants/board';
import './style.scss';
/**
 * - host all the columns
 * 
 */
export function SwimlaneDashboard() {
    return <div className='swimlane-dashboard'>
        {
            SWIMLANE_CONFIG.map(column => {
                return <SwimlaneColumn column={column} />
            })
        }
    </div>
}