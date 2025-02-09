import DateTime from "./DateTime";
import { FaCalendarAlt } from 'react-icons/fa';
import "./styles/nav.css";

// eslint-disable-next-line react/prop-types
function Nav({ setShowCalendar }) {
  return (
    <div className="nav-container">
      <h1 className="nav-title">   Plan It</h1>

      <DateTime />

      <div className="calendar-icon" onClick={() => setShowCalendar(true)}>
        <FaCalendarAlt className="icon-size" />
      </div>
    </div>
  );
}

export default Nav;
