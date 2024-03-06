
import { utilService } from "../../services/util.service"
export function StatusCmp({ info, onUpdate }) {
    
    const StatusInfo = [{id: utilService.makeId(), label: 'Working on it',backgroundColor: 'rgb(253, 171, 61)'},
                            {id: utilService.makeId(), label: 'Done',backgroundColor: ' rgb(0, 200, 117)'},
                            {id: utilService.makeId(), label: 'Stuck',backgroundColor: 'rgb(226, 68, 92)'},
                            {id: utilService.makeId(), label: 'Not Started',backgroundColor: 'rgb(196, 196, 196)'}]

    function onChangeStatus({ label, backgroundColor}) {
        info.selectedStatus = {label: label, backgroundColor: backgroundColor}
        info.statuses = priorityInfo
        onUpdate(info)
    }


    return <section className="dynamic-cmp-list-items">
            <section className="selected-item">
                <h1 style={{ background: info.selectedStatus.backgroundColor }}> hey {info.selectedStatus.label}</h1>
            </section>
            {/* <ul className="items-container">
                {
                    StatusInfo.map((status) => 
                        <li className="item" key={status.id} onClick={() => onChangeStatus(status)}
                            style={{ backgroundColor: status.backgroundColor }}
                            label={status.label}>
                        </li>
                    )
                }
            </ul> */}
    </section>
}