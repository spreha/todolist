 import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './cal.css';
import ToDo from './ToDo';

// eslint-disable-next-line react/prop-types
function Cal({ showCalendar }) {
  const [date, setDate] = useState(new Date());

  return (
    <div className="w-full flex">
      {showCalendar && (
        <div className="z-99 text-xl font-bold w-1/2 flex">
          <Calendar onChange={setDate} value={date} />
        </div>
      )}
      <div className="w-2/3">
        <ToDo selectedDate={date} />
      </div>
    </div>
  );
}

export default Cal; 
/*import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './cal.css';
import ToDo from './ToDo';

// eslint-disable-next-line react/prop-types
function Cal({ showCalendar }) {
    const [date, setDate] = useState(new Date());

    return (
        <div className="cal-container">
            {showCalendar && (
                <div className="cal-calendar-container">
                    <Calendar onChange={setDate} value={date} />
                </div>
            )}
            <div className="cal-todo-container">
                <ToDo selectedDate={date} />
            </div>
        </div>
    );
}

export default Cal;

*/

