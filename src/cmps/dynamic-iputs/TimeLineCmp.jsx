import { useEffect, useRef, useState } from "react";
import { addDays, format, formatDistance } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";
import "react-day-picker/dist/style.css";
import { useDebounce } from "../../customHooks/useDebounce";

export function TimeLineCmp({ info, onUpdateEntity }) {
  const [openEditModel, setOpenEditModel] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [infoToEdit, setInfoToEdit] = useState(info);
  const modalRef = useRef();
  
  const defaultSelected = {
    from: new Date(),
    to: addDays(new Date(), 1)
  };
  
  const [range, setRange] = useState(isValidDate(info.selectedTimeLine) || defaultSelected)

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


  function handleChange(range){

    setRange(range)
    
    setInfoToEdit((prevInfo) => ({
      ...prevInfo,
      selectedTimeLine: range,
    }));

    onUpdateEntity(range)
  }


  function handleClickModal() {
    setOpenEditModel(!openEditModel);
  }

  function isValidDate(date){
      if(date?.from && date?.to){
        return date
      }

      return null
  }

  const backgroundColor = setBackgroundColor(info);

  function setBackgroundColor(info) {
    if (isValidDate(info.selectedTimeLine)) {
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
        {isValidDate(info.selectedTimeLine) === null &&(
          <span className="empty-time-for-task">
            {isHovered ? "Set Dates" : "-"}
          </span>
        )}
        {isValidDate(info.selectedTimeLine) &&(
          <span className="empty-time-for-task">
            {isHovered
              ? `${formatDistance(info.selectedTimeLine.from, info.selectedTimeLine.to)}`
              : `${format(info.selectedTimeLine.from, "LLL d")}–${format(info.selectedTimeLine.to, "LLL d")}`}
          </span>
        )}
      </ button>

      {openEditModel && (
        <section ref={modalRef} className="calender-model">
          <DayPicker
            id="test"
            mode="range"
            numberOfMonths={2}
            captionLayout="dropdown-buttons"
            fromYear={2015}
            toYear={2025}
            defaultMonth={new Date()}
            selected={range}
            onSelect={handleChange}
          />
        </section>
      )}
    </section>
  );
}
