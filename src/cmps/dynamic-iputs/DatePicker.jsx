import { useState } from "react";

import { addDays, format } from "date-fns";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css'; 

const pastMonth = new Date();

export function DatePicker() {
  const defaultSelected = {
      from: pastMonth,
      to: addDays(pastMonth, 4),
    };
    
    const [range, setRange] = useState(defaultSelected)

    let footer = <p>Please pick the first day.</p>;
    if (range?.from) {
      if (!range.to) {
        footer = <p>{format(range.from, "PPP")}</p>;
      } else if (range.to) {
        footer = (
          <p>
            {format(range.from, "PPP")}–{format(range.to, "PPP")}
          </p>
        );
      }
    }

  console.log(range)

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
