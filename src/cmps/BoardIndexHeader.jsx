import { utilService } from "../services/util.service"
import { SaveTask } from "../store/board.actions"
// import { storeSaveTask } from "../store/board.actions"

// two way data binding between sidenav to BoardIndexHeader - board name
export function BoardIndexHeader( currBoardId ) {
    
    const tabs = [{id: utilService.makeId(), title: 'Main Table'}, 
                {id: utilService.makeId(), title: 'Kanban'} , 
                {id: utilService.makeId(), title: 'Dashboard'}]

                // add task - it add to the first group in the board
                // add new group to the project

    console.log('BoardIndexHeader : currBoard' , currBoardId)
    
    
    return (
        <section className='board-index-header'>
           {/* <h1 className='board-name fs30'>{currBoard.title}</h1>  */}
           <p className='board-info fs14'>Manage any type of project. Assign owners, set timelines and keep track 
            of where your project stands</p>
            <section className='board-data-display'>{
                tabs.map((tab) => (
                    <h5 key={tab.id}>{tab.title}</h5>
                ))
            }
            </section>
            <section className='board-actions'>
                <section className='addition-actions'>
                    <button className='add-task' onClick={() => SaveTask(currBoard._id)}>New Task</button>
                    <button className='add-group'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                </section>
            </section>

        </section>
    )
}
