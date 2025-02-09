import { useState } from 'react';
import Nav from './NavBar'
import Cal from './Cal'

function App() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div>
      <Nav toggleCalendar={() => setShowCalendar((prev) => !prev)} />
      <Cal showCalendar={showCalendar} />
    </div>
  );
}

export default App;
