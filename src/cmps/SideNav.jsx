// import routes from '../routes'
import { NavLink, useParams } from "react-router-dom";
import { svgService } from "../svg.service";
import { useState } from "react";
import { AddBoardModal } from "./AddBoardModal";

export function SideNav({ boards, onRemoveBoard, onAddBoard, onUpdateBoard }) {
  const [isShowTextBox, setIsShowTextBox] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [boardTitleToChang, setBoardTitleToChang] = useState("")
  const [inputFocused, setInputFocused] = useState(null)

  const [ filterText, setFilterText ] = useState ('')

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = (board) => {
    setInputFocused(false);
    onUpdateBoard(board);
  };

  const filteredBoards = boards.filter ( board => board.title.includes(filterText))
 
  // function onChangeBoardTitle(boardId) {
  //   setBoardTitleToChang(board);
  //   setIsShowTextBox(true);
  // }

  function handleChange(ev) {
    const val = ev.target.value;
    setBoardTitleToChang((prevBoard) => ({ ...prevBoard, title: val }));
  }

  function handleOpenModal(){
    setShowModal(true)
  }
  function handleCloseModal(){
    setShowModal(false) 
  }

  // const params = useParams()
  return (
    <nav className="side-navigation">
      <section className="sidenav-header">
        <div className="sidenav-home">
          <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" className="icon_df339fdbe4 noFocusStyle_f92aa008bb" data-testid="icon"><path d="M9.56992 2.1408C9.82591 1.95307 10.1741 1.95307 10.4301 2.1408L17.7028 7.47413C17.8896 7.61113 18 7.82894 18 8.06061V16.7879C18 17.1895 17.6744 17.5152 17.2727 17.5152H11.9394C11.5377 17.5152 11.2121 17.1895 11.2121 16.7879V13.1515H8.78788V16.7879C8.78788 17.1895 8.46227 17.5152 8.06061 17.5152H2.72727C2.32561 17.5152 2 17.1895 2 16.7879V8.06061C2 7.82894 2.11037 7.61113 2.29719 7.47413L9.56992 2.1408ZM3.45455 8.42914V16.0606H7.33333V12.4242C7.33333 12.0226 7.65894 11.697 8.06061 11.697H11.9394C12.3411 11.697 12.6667 12.0226 12.6667 12.4242V16.0606H16.5455V8.42914L10 3.62914L3.45455 8.42914Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          <NavLink to={`/boards`}>Home</NavLink>
        </div>
      </section>

      <section className="sidenav-main">
        <section className="main-header">
          <section className="main-title">
            <div className="workspace-name"><span>S</span></div>
            <h2>Main workspace</h2>
          </section>

          <section className="sidenav-search">
            <section className="search-input">
              <label htmlFor="searchBoard" hidden>search board</label>
              <div className="search-icon">
                <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" className="icon_d24b689566 search-icon" data-testid="icon"><path d="M8.65191 2.37299C6.9706 2.37299 5.35814 3.04089 4.16927 4.22976C2.9804 5.41863 2.3125 7.03108 2.3125 8.7124C2.3125 10.3937 2.9804 12.0062 4.16927 13.195C5.35814 14.3839 6.9706 15.0518 8.65191 15.0518C10.0813 15.0518 11.4609 14.5691 12.5728 13.6939L16.4086 17.5303C16.7014 17.8232 17.1763 17.8232 17.4692 17.5303C17.7621 17.2375 17.7622 16.7626 17.4693 16.4697L13.6334 12.6333C14.5086 11.5214 14.9913 10.1418 14.9913 8.7124C14.9913 7.03108 14.3234 5.41863 13.1346 4.22976C11.9457 3.04089 10.3332 2.37299 8.65191 2.37299ZM12.091 12.1172C12.9878 11.2113 13.4913 9.98783 13.4913 8.7124C13.4913 7.42891 12.9815 6.19798 12.0739 5.29042C11.1663 4.38285 9.9354 3.87299 8.65191 3.87299C7.36842 3.87299 6.1375 4.38285 5.22993 5.29042C4.32237 6.19798 3.8125 7.42891 3.8125 8.7124C3.8125 9.99589 4.32237 11.2268 5.22993 12.1344C6.1375 13.0419 7.36842 13.5518 8.65191 13.5518C9.92736 13.5518 11.1509 13.0483 12.0568 12.1514C12.0623 12.1455 12.0679 12.1397 12.0737 12.134C12.0794 12.1283 12.0851 12.1227 12.091 12.1172Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </div>
              <input type="text" id="searchBoard" name="searchBoard" placeholder="Search" value = {filterText} onChange= { (e) => setFilterText (e.target.value) } />
              <button className="sidenav-filter-btn">
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" role="img" aria-hidden="true"><path d="M17.8571 2.87669C18.107 3.41157 18.0246 4.04275 17.6457 4.49555L12.4892 10.6589V15.3856C12.4892 16.0185 12.097 16.5852 11.5048 16.8082L9.56669 17.5381C9.09976 17.7139 8.57627 17.6494 8.16598 17.3655C7.75569 17.0816 7.51084 16.6144 7.51084 16.1155V10.6589L2.35425 4.49555C1.97542 4.04275 1.89302 3.41157 2.14291 2.87669C2.39279 2.34182 2.92977 2 3.52013 2H16.4799C17.0702 2 17.6072 2.34182 17.8571 2.87669ZM16.4799 3.52012H3.52013L8.91611 9.96964C8.99036 10.0584 9.03096 10.1698 9.03096 10.2848V16.1155L10.969 15.3856V10.2848C10.969 10.1698 11.0096 10.0584 11.0839 9.96964L16.4799 3.52012Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>            
              </button>
            </section>

            {/* <button className="add-board-btn" onClick={() => onAddBoard()}> */}
            <button className="add-board-btn" onClick={handleOpenModal}>
              <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" className="icon_d24b689566 noFocusStyle_07ecef1878" data-testid="icon"><path d="M10.75 6C10.75 5.58579 10.4142 5.25 10 5.25C9.58579 5.25 9.25 5.58579 9.25 6V9.25H6C5.58579 9.25 5.25 9.58579 5.25 10C5.25 10.4142 5.58579 10.75 6 10.75H9.25V14C9.25 14.4142 9.58579 14.75 10 14.75C10.4142 14.75 10.75 14.4142 10.75 14V10.75H14C14.4142 10.75 14.75 10.4142 14.75 10C14.75 9.58579 14.4142 9.25 14 9.25H10.75V6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </button>
          </section>

          <section className="sidenav-boards">
            {filteredBoards.map((board) => (
              <div key={board._id} className="sidenav-board">
                <svg viewBox="0 0 20 20" fill="currentColor" width="19" height="19" aria-hidden="true" aria-label="Public board" className="icon_component">
                  <path d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                <NavLink key={board._id} to={`/boards/${board._id}`}>{board.title}</NavLink>
                {isShowTextBox && (
                  <input onFocus={handleInputFocus} onBlur={() => handleInputBlur(board)} onChange={() => handleChange(board)} />
                  )}
                <button className="more-btn-show" onClick={() => onRemoveBoard(board._id)}>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" className="icon_d24b689566 noFocusStyle_07ecef1878" data-testid="icon"><path d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z" fill="currentColor"></path></svg>
                </button>
              </div>
            ))}
          </section>
        </section>
      </section>

      {showModal && <AddBoardModal onAddBoard={onAddBoard} handleCloseModal={handleCloseModal}/>}
    </nav>
  );
}
