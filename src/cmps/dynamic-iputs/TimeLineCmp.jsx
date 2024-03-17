import { useEffect, useRef, useState } from "react";
import { utilService } from "../../services/util.service";
import { DatePicker } from "./DatePicker";

export function TimeLineCmp({ info, onUpdateEntity }) {
  const [openEditModel, setOpenEditModel] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClickModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickModal]);

  function handleClickModal() {
    setOpenEditModel(!openEditModel);
  }

  function onChoseDates(range) {
    
  }

  const backgroundColor = setBackgroundColor(info);

  function setBackgroundColor(info) {
    if (info.selectedTimeLine) {
      return `#333333`;
    }
    return "rgb(196, 196, 196)";
  }

  return (
    <section className="timeline">
      <button
        onClick={handleClickModal}
        style={{ background: backgroundColor }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="set-time-line"
      >
        {!info.selectedTimeLine && (
          <span className="empty-time-for-task">{isHovered ? 'Set Dates' : '-'}</span>
        )}
      </button>
      {openEditModel && (
        <section ref={modalRef} className="calender-model">
          <DatePicker />
        </section>
      )}
    </section>
  );
}
