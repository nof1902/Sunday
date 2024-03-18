// import routes from '../routes'
import { useEffect, useRef } from "react";
import { getEmptyGroup } from "../store/actions/board.actions";
import OptionsActionsCmpStyle from "./OptionsActionsCmpStyle";

export function OptionsActionsCmp({ onAction, onActionProps ,handleSetModal, actionType }) {
  
  const modalRef = useRef();
  const actions = {
    addGroup: () => onAction(0,getEmptyGroup(),{}),
    removeGroup: () => onAction(onActionProps),
    removeTask: () => onAction(onActionProps),
  };
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleSetModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleSetModal]);

  function onHandleAction() {
    const actionFunc = actions[actionType];
    if (actionFunc) {
      actionFunc(onActionProps);
      handleSetModal();
    } else {
      console.log(`Action ${actionType} not found.`);
    }
  }

  
  return (
    <section ref={modalRef} className="set-board-options">
      <div onClick={onHandleAction} className="update-board">
        <OptionsActionsCmpStyle actionType={actionType}/>
      </div>
    </section>
  );
}
