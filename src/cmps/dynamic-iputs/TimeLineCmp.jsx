import { useEffect, useRef, useState } from "react";
import { addDays, differenceInDays, format, formatDistance, isAfter, isPast } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";
import "react-day-picker/dist/style.css";
import { useDebounce } from "../../customHooks/useDebounce";

export function TimeLineCmp({ info, onUpdateEntity, groupStyle }) {
  const [openEditModel, setOpenEditModel] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [infoToEdit, setInfoToEdit] = useState(info);
  const modalRef = useRef();
  
  const defaultSelected = {
    from: new Date(),
    to: addDays(new Date(), 1)
  };
  
  const [range, setRange] = useState(isValidDate(info?.selectedTimeLine) || defaultSelected)

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


  function onHover() {
    if (!info.selectedTimeLine) return "-"; // Return a placeholder if there's no selected timeline
    if (isHovered) {
      return formatDistance(info.selectedTimeLine.from, info.selectedTimeLine.to);
    } else {
      if (format(info.selectedTimeLine.from, "LLL") !== format(info.selectedTimeLine.to, "LLL")) {
        return `${format(info.selectedTimeLine.from, "LLL d")}-${format(info.selectedTimeLine.to, "LLL d")}`;
      } else {
        return `${format(info.selectedTimeLine.from, "d")}-${format(info.selectedTimeLine.to, "d LLL")}`;
      }
    }
  }

  const background = (info.selectedTimeLine.from && info.selectedTimeLine.to)  ? `#333333` : "rgb(196, 196, 196)" 

  return (
    <section className="timeline">
      <button
        onClick={handleClickModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ background: background}}
        className="time-line-btn"
      >
        {isValidDate(info.selectedTimeLine) === null &&(
        <span className="time-for-task">
          {isHovered ? "Set Dates" : "-"}
        </span>
        )}
        {isValidDate(info.selectedTimeLine) &&(
        <span className="time-for-task">
          {onHover()}
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
