import { AppHeader } from "../cmps/AppHeader";
import { BoardsIndex } from "../cmps/BoardsIndex";
import { SideNav } from "../cmps/SideNav";



export function MainBoard() {
    
    return (
        <main className="main-board">
            <section className='main-board-header'>
                <AppHeader />
            </section>
            {/* 
            
                Outlet?  <BoardsIndex /> && <BoardIndex />
                all boards & the board wuth all groups & tasks
            */}
            <section className='boards-index'>
                <BoardsIndex />
            </section>
            <section className='side-nav'>
                <SideNav />
            </section>
        </main>
    )
}