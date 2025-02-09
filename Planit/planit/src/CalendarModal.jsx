import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles/cal.css';

// eslint-disable-next-line react/prop-types
function CalendarModal({ selectedDate, setSelectedDate, setShowCalendar }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Select a Date</h2>
        
        <Calendar 
          onChange={(date) => {
            setSelectedDate(date); 
            setShowCalendar(false); 
          }} 
          value={selectedDate} 
        />
        
        <button className="close-button" onClick={() => setShowCalendar(false)}>
          Close
        </button>
      </div>
    </div>
  );
}

export default CalendarModal;
