import { useEffect, useState } from "react";
import { addDays, format, formatDistance, isSameDay, isBefore } from "date-fns";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css'; 
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";


export function DatePicker(onChoseDates) {
  
  // const defaultSelected = {
  //   from: pastMonth,
  //   to: addDays(pastMonth, 4),
  // };
  // const [range, setRange] = useState(defaultSelected)

  // useEffectUpdate(() => {
  //   const datesRange ={
  //     from: format(range.from, "PP"),
  //     to: format(range.to, "PP"),
  //     distance: formatDistance(range.from,range.to)
  //   }
  //   onChoseDates()

  // },[range])

  // let footer = <p>Please pick the first day.</p>;
  // if (range?.from) {
  //   if (!range.to) {
  //     footer = <p>{format(range.from, "PPP")}</p>;
  //   } else if (range.to) {
  //     footer = (
  //       <p>
  //         {format(range.from, "PPP")}–{format(range.to, "PPP")}
  //       </p>
  //     );
  //   }
  // }

  return (
    <section>
      <DayPicker
        id="test"
        mode="range"
        numberOfMonths={2}
        captionLayout="dropdown-buttons" fromYear={2015} toYear={2025}
        defaultMonth={pastMonth}
        selected={range}
        // footer={footer}
        onSelect={setRange}
      />
    </section>
  );
}



  // const defaultSelected = DateRange({
  //   from: pastMonth,
  //   to: addDays(pastMonth, 4),
  // })


  // const defaultSelected: DateRange = {
  //     from: pastMonth,
  //     to: addDays(pastMonth, 4),
  //   };

  //   const [range, setRange] = useState(defaultSelected)
  //   const [selectedDays, setSelectedDays] = useState([]);

  // console.log(format(defaultSelected, 'PPP'))
  // console.log(formatDistance(range.from,range.to))
  // formatDistance(defaultSelected.from,defaultSelected.to, 'PPP')

  // function handleDayClick(day, modifiers ) {
  //   let newSelectedDays = [...selectedDays];
  
  //   if (modifiers.selected) {
  //     // Find the clicked day, and remove it and all dates after it from the selection
  //     const selectedIndex = selectedDays.findIndex(selectedDay => isSameDay(day, selectedDay));
  //     newSelectedDays = selectedDays.slice(0, selectedIndex);
  //   } else {
  //     // If the day is before the earliest day in the range, add all days from it to the earliest day
  //     // Otherwise, add it to the range
  //     if (newSelectedDays.length > 0 && isBefore(day, newSelectedDays[0])) {
  //       let newDay = day;
  //       while (isBefore(newDay, newSelectedDays[0]) || isSameDay(newDay, newSelectedDays[0])) {
  //         if (!newSelectedDays.find(d => isSameDay(d, newDay))) {
  //           newSelectedDays.push(newDay);
  //         }
  //         newDay = addDays(newDay, 1);
  //       }
  //     } else {
  //       newSelectedDays.push(day);
  //     }
  //   }
  
  //   setSelectedDays(newSelectedDays.sort((a, b) => a - b)); // Sort the dates
  // };

  // const handleResetClick = () => setSelectedDays([]);


  // let footer = <p>Please pick the first day.</p>;
  // if (range?.from) {
  //   if (!range.to) {
  //     footer = <p>{format(range.to, 'PPP')}</p>;
  //   } else if (range.to) {
  //     footer = (
  //       <p>
  //         {format(range.to, 'PPP')}–{format(range.from, 'PPP')}
  //       </p>
  //     );
  //   }
  // }

  // return (
  //   <section>
  //     <DayPicker
  //       id="test"
  //       mode="range"
  //       numberOfMonths={2}
  //       onDayClick={handleDayClick}
  //       captionLayout="dropdown-buttons" fromYear={2015} toYear={2025}
  //       defaultMonth={pastMonth}
  //       selected={range}
  //       onSelect={setRange}
  //       footer={footer}
  //     />
  //   </section>
  // );