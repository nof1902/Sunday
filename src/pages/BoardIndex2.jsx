import { useState } from "react";
import { AppHeader } from "../cmps/AppHeader";
import { BoardsIndex } from "../cmps/BoardsIndex";
import { SideNav } from "../cmps/SideNav";
import { BoardIndex } from "./BoardIndex";
import { useSelector } from "react-redux";
import { BoardPreview } from "./BoardPreview.jsx";

export function MainBoard2() {
    
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const [isBoardsList, setIsBoardsList] = useState(true)

    useEffect(() => {
        loadBoards()
      }, [])

      

    function onChooseBoard(){
        setIsBoardsList(false)
    }

    function onChooseBoard(boardId){
        setIsBoardsList(false)
        
    }
    
    return (
        <main className="main-board">
            <section className='main-board-header'>
                <AppHeader />
            </section>
            <section className='boards-index'>
                {isBoardsList && <BoardsIndex onChooseBoard={onChooseBoard} boards={boards}/>}

                {!isBoardsList && <BoardsIndex boards={boards}/>}
            </section>
            <section className='side-nav'>
                <SideNav />
            </section>
        </main>
    )
}