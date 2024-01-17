import { utilService } from "../services/util.service"

// two way data binding between sidenav to BoardIndexHeader - board name
export function BoardIndexHeader() {
    
    const tabs = [{id: utilService.makeId(), title: 'Main Table'}, 
                {id: utilService.makeId(), title: 'Kanban'} , 
                {id: utilService.makeId(), title: 'Dashboard'}]
    return (
        <section className='board-index-header'>
           <h1 className='board-name fs30'>First Board</h1> 
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
                    <button className='add-board'>New Project</button>
                    <button className='add-group'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                </section>
            </section>

        </section>
    )
}
