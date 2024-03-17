import { useEffect, useRef, useState } from "react";
import { addDays, format, formatDistance ,isValid, parse, } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";
import "react-day-picker/dist/style.css";
import { useDebounce } from "../../customHooks/useDebounce";

export function TimeLineCmp({ info, onUpdateEntity }) {
  const [openEditModel, setOpenEditModel] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [infoToEdit, setInfoToEdit] = useState(info);
  const debouncedInfoToEdit = useDebounce(infoToEdit, 500);
  const modalRef = useRef();

  const pastMonth = new Date();
  const defaultSelected = {
    from: pastMonth,
    to: addDays(pastMonth, 1),
  };

  
  const [range, setRange] = useState((infoToEdit?.selectedTimeLine?.to && 
                                      infoToEdit?.selectedTimeLine?.from)
                                       || defaultSelected);
  
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

  useEffectUpdate(() => {
      onUpdateEntity(infoToEdit)
  },[debouncedInfoToEdit])

  function handleChange(range) {
    setInfoToEdit((prevInfo) => ({
      ...prevInfo,
      selectedTimeLine: range,
    }));
  }

  function handleClickModal() {
    setOpenEditModel(!openEditModel);
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
          <span className="empty-time-for-task">
            {isHovered ? "Set Dates" : "-"}
          </span>
        )}

        {info.selectedTimeLine &&(
          <span className="empty-time-for-task">
            {isHovered
              ? `${formatDistance(range.from, range.to)}`
              : `${format(range.from, "LLL d")}–${format(range.to, "LLL d")}`}
          </span>
        )}
        {/* {info.selectedTimeLine && openEditModel &&(
          <span className="empty-time-for-task">
            {isHovered
              ? `${formatDistance(info.selectedTimeLine.from, info.selectedTimeLine.to)}`
              : `${format(range.from, "LLL d")}–${format(range.to, "LLL d")}`}
          </span>
        )} */}
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
            defaultMonth={pastMonth}
            selected={range}
            onSelect={setRange}
            onDayClick={handleChange}
          />
        </section>
      )}
    </section>
  );
}
