
// import routes from '../routes'
import { NavLink, useParams } from "react-router-dom"
import { svgService } from "../svg.service"
import { useState } from "react"

export function SideNav({ boards, onRemoveBoard, onAddBoard ,onUpdateBoard}) {

    const [isShowTextBox, setIsShowTextBox] = useState(false)
    const [boardTitleToChang, setBoardTitleToChang] = useState('')
    const [inputFocused, setInputFocused] = useState(null)

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = (board) => {
        setInputFocused(false);
        onUpdateBoard(board)
    };
    const homeIcon = svgService.getSvg('home')
    const homeIconUrl = `data:image/svg+xml,${encodeURIComponent(homeIcon)}`

    const boardIcon = svgService.getSvg('clipboard')
    const boardIconUrl = `data:image/svg+xml,${encodeURIComponent(boardIcon)}`

    const searchIcon = svgService.getSvg ('search')
    const searchIconUrl = `data:image/svg+xml,${encodeURIComponent(searchIcon)}`


    function onChangeBoardTitle(boardId){
        
        setBoardTitleToChang(board)
        setIsShowTextBox(true)
    }

    function handleChange(ev){
        const val = ev.target.value;
        setBoardTitleToChang(prevBoard => ({ ...prevBoard, title: val }))
    }

    // const params = useParams()
    return (
        <nav className="side-navigation">
            {/* {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)} */}
            <div className="sidenav-home">
                 <img src={homeIconUrl} />
                 <NavLink to={`/boards`}>Home</NavLink>
            </div>
            
            <div className="sidenav-search">
                <input type="text" placeholder="Search"></input>
                <img src={searchIconUrl} />
            </div>

            <button onClick={() => onAddBoard()}>+</button>
                
                {boards.map(board =>  (
                        <div className="sidenav-home" key={board._id}>
                            <img src={boardIconUrl} />
                            <NavLink key={board._id} to={`/boards/${board._id}`}>
                                {board.title}    
                            </NavLink>
                                <button onClick={() => onChangeBoardTitle(board)}>E</button>
                            { isShowTextBox && <input onFocus={handleInputFocus} onBlur={() => handleInputBlur(board)} onChange={() => handleChange(board)}/> }
                            <button onClick={() => onRemoveBoard(board._id)}>X</button>
                        </div>
                        ))}
        </nav>
    )
}