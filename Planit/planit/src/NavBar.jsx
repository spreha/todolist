import DateTime from "./DateTime";

// eslint-disable-next-line react/prop-types
function Nav({ toggleCalendar }){
    return(
        <div className="w-full bg-black flex">
            <div className="w-1/2">
                <h1 className="text-white font-bold text-2xl ml-20 py-2">Plannit</h1>
            </div>
            <button onClick={toggleCalendar} className="bg-blue-500 px-4 py-2 rounded">
        Toggle Calendar
      </button>
            <div className="w-1/2">
                <DateTime />
            </div>
        </div>
    )
}

export default Nav;

/*
import DateTime from "./DateTime";
import "./cal.css";

// eslint-disable-next-line react/prop-types


function Nav({ toggleCalendar }) {
    return (
        <div className="nav-container">
            <div className="nav-title">
                <h1>Plannit</h1>
            </div>
            <button onClick={toggleCalendar} className="nav-button">
                Toggle Calendar
            </button>
            <div className="nav-datetime">
                <DateTime />
            </div>
        </div>
    );
}

export default Nav;*/
