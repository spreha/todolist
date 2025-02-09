import { useEffect, useState } from "react";
import "./styles/datetime.css";

export default function DateTime() {
    const [currentDateTime, setCurrentDateTime] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formattedDate = formatDate(now);
            const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setCurrentDateTime(`${formattedDate} ${time}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
//month-numeric shrt narrow 2digit
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        const day = date.getDate();
        const suffix = day % 10 === 1 && day !== 11 ? 'st' :
                       day % 10 === 2 && day !== 12 ? 'nd' :
                       day % 10 === 3 && day !== 13 ? 'rd' : 'th';

        return formattedDate.replace(day, `${day}${suffix}`);
    }

    return (
        <div className="datetime-container">
            <h1 className="datetime-text">{currentDateTime}</h1>
        </div>
    );
}
